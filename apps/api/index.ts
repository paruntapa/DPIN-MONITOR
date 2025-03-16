import express from "express";
import { authMiddleware } from "./middleware";
import { prismaClient } from "../../packages/db/src";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/v1/website", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const {url} = req.body;
    const data = await prismaClient.website.create({
        data: {
            url, 
            userId
        }
    });

    res.send(data.id);
});

app.get("/api/v1/website/status", authMiddleware, async (req, res) => {
    const websiteId = req.query.websiteId as unknown as string;
    const userId = req.userId;
    if(!userId) {
        return
    }
    const data = await prismaClient.website.findFirst({
        where: {
            id: websiteId,
            userId,
            disabled: false
        },
        include: {
            ticks: true
        }
    });
    res.send(data);
});

app.get("/api/v1/websites", authMiddleware, async (req, res) => {
    const userId = req.userId;
    const websites = await prismaClient.website.findMany({
        where: {
            userId,
            disabled: false
        },
        include: {
            ticks: true
        }
    })
    res.json({websites: websites});
});

app.delete("/api/v1/website/", authMiddleware, async (req, res) => {
    const websiteId = req.body.websiteId; 
    const userId = req.userId;
    await prismaClient.website.update({
        where: {
            id: websiteId,
            userId
        },
        data: {
            disabled: true
        }
    })

    res.send("successfully deleted");

});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
import express from "express";
import { authMiddleware } from "./middleware";
import { prismaClient } from "../../packages/db/src";

const app = express();
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
            userId
        },
        include: {
            ticks: true
        }
    });
    res.send(data);
});

app.get("/api/v1/websites", authMiddleware, async (req, res) => {
    const userId = req.userId;
    await prismaClient.website.findMany({
        where: {
            userId,
            disabled: false
        }
    }).then((data) => {
        res.send(data);
    });
});

app.delete("/api/v1/website/", authMiddleware, (req, res) => {

});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
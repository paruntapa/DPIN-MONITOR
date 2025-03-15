import type { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    req.userId = "1";
    next();

    // if (req.headers.authorization) {
    //     const token = req.headers.authorization.split(" ")[1];
    //     if (token) {
    //         next();
    //     } else {
    //         res.status(401).send("Unauthorized");
    //     }
    // } else {
    //     res.status(401).send("Unauthorized");
    // }
};
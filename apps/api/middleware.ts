import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PUBLIC_KEY } from "./config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if(!token ) {
        res.status(401).send("Unauthorized");
        return
    }
    const decoded = jwt.verify(token, JWT_PUBLIC_KEY) 
    if(!decoded.sub || !decoded) {
        res.status(401).send("Unauthorized");
        return
    }
    req.userId = decoded.sub as string;
    next();
};
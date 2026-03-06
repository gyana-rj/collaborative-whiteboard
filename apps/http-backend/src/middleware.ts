import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config"
export function middleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "";

    try{
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if(decoded && decoded.userId){
        req.userId = decoded.userId as string;
        next();
    }else{
        res.status(403).json({
            msg : "Invalid user"
        })
    }
    }catch(e){
        res.status(403).json({
            msg: "invalid token"
        })
    }

}
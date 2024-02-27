import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

const secretKey = process.env.jwt_secret

export interface CustomRequestVerify extends Request{
    user?: string;
}

interface Verify{
    name?: string
}



export const verifyJWT = async (req : CustomRequestVerify, res:Response, next:NextFunction) => {
    const token = req.cookies.JWT;
    if(!token) return res.status(400).send("Token not Found!");
    if(!secretKey) return res.status(400).send("secret Key is missing!");

    try{
        const verify:string | JwtPayload | Verify =  jwt.verify(token, secretKey) as JwtPayload;
        req.user = verify.name;
        next();

    }catch(err){

    }
}
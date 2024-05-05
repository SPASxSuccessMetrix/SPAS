import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { User } from "./models/User";

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

export const verifyProfessor = async (req:CustomRequestVerify, res: Response, next: NextFunction) => {

    try{
        const user = await User.findOne({name: req?.user});
        if (!user) res.status(404).send("Invalid User!")
        
        if(user?.role === 'professor'){
            next();
        } else{
            res.status(404).send("You are not allowed to do this action!");
        }
    }catch(err){
        res.status(200).send(err)
    }
}
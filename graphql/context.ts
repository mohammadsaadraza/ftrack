import { PrismaClient, SuperUser } from "@prisma/client"
import {NextApiRequest, NextApiResponse} from "next";
import jwt from "jsonwebtoken";

export interface Context {
    prisma: PrismaClient
    request: NextApiRequest,
    response: NextApiResponse,
    user?: SuperUser
}

const prisma = new PrismaClient()

export const context = ({ req, res } : { req: NextApiRequest, res: NextApiResponse}) : Context => {

    let output: Context = {
        prisma,
        request: req,
        response: res,
    }

    decodeToken(output, req.headers.authorization)

    return output
}

function decodeToken(output : Context, authorization: string | undefined){

    try{
        if (authorization && authorization.replace("Bearer ", "").length > 0) {
            const token = authorization.split(" ")[1];
            output.user = jwt.verify(token, process.env.JWT_SECRET || "") as SuperUser;
        }
    }catch(e){
        return
    }  
}
import { PrismaClient } from "@prisma/client"
import {NextApiRequest} from "next";

export interface Context {
    prisma: PrismaClient
}

const prisma = new PrismaClient()
prisma.$connect().catch(() => {throw new Error("Problem connecting to database") })

export const context = ({ req } : { req: NextApiRequest}) : Context => {
    return {
        prisma
    }
}
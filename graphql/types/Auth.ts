import {extendType, nonNull, objectType, stringArg} from "nexus";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const AuthResponse = objectType({
    name: "AuthResponse",
    definition(t){
        t.nonNull.string("token")
    }
})

export const Authenticate = extendType({
    type: "Query",
    definition(t){
        t.nonNull.field("authenticate", {
            type: AuthResponse,
            args: {
                password: nonNull(stringArg())
            },
            async resolve(parent, args, context){

                const users = await context.prisma.superUser.findMany()
                const user = users.find(u=> {
                    return  bcrypt.compareSync(args.password, u.password)
                })

                if(!user){
                    throw new Error("Invalid password")
                }

                if(!process.env.JWT_SECRET){
                    throw new Error("Something went wrong") 
                }

                const access_token = jwt.sign({ id: user.id, role: user.type}, process.env.JWT_SECRET, {
                    expiresIn: "5m"
                })
                const refresh_token = jwt.sign({ id: user.id, role: user.type}, process.env.JWT_SECRET, {
                    expiresIn: "1d"
                })

                return {
                    token: access_token
                }
            }
        })
    }
})
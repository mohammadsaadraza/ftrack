import {extendType, nonNull, objectType, stringArg} from "nexus";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-micro";

export const AuthResponse = objectType({
    name: "AuthResponse",
    definition(t){
        t.nonNull.string("access_token")
        t.nonNull.string("refresh_token")
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
                    throw new AuthenticationError("Invalid password")
                }

                if(!process.env.JWT_SECRET){
                    throw new Error("Something went wrong") 
                }

                try {
                  const access_token = jwt.sign(
                    { id: user.id, role: user.type },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "5m",
                    }
                  );
                  const refresh_token = jwt.sign(
                    { id: user.id, role: user.type },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "4h",
                    }
                  );

                  return {
                    access_token,
                    refresh_token,
                  };
                } catch (e: any) {
                  console.log((e as Error).message);
                  throw new Error("Problem with Query");
                }
            }
        })
    }
})

export const Refresh = extendType({
    type: "Query",
    definition(t){
        t.nonNull.field("refresh", {
            type: AuthResponse,
            async resolve(parent, args, context){

                if(!context.user){
                    throw new AuthenticationError("No token provided. Unauthenticated.")
                }

                if(!process.env.JWT_SECRET){
                    throw new Error("Something went wrong") 
                }

                try {
                  const access_token = jwt.sign(
                    { id: context.user.id, role: context.user.type },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "5m",
                    }
                  );
                  const refresh_token = jwt.sign(
                    { id: context.user.id, role: context.user.type },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "4h",
                    }
                  );

                  return {
                    access_token,
                    refresh_token,
                  };
                } catch (e: any) {
                  console.log((e as Error).message);
                  throw new Error("Problem with Query");
                }
            }
        })
    }
})
import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {ApolloServer} from "apollo-server-micro";
import {
    ApolloServerPluginLandingPageLocalDefault
} from "apollo-server-core";

import { schema }from "../../graphql/schema";
import { context } from "../../graphql/context";

const apolloServer = new ApolloServer({
    schema,
    context,
    cache: "bounded",
    introspection: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault({embed: true})]
})
const startServer = apolloServer.start()


const handler : NextApiHandler<any> = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }

    await startServer
    await apolloServer.createHandler({
        path: "/api/graphql"
    })(req,res)
}

export default handler;

export const config = {
    api: {
        bodyParser: false
    }
}
import { makeSchema } from "nexus";
import { join } from "path"

import * as types from "./types"

export const schema = makeSchema({
    types,
    outputs: {
        typegen: join(process.cwd(), "graphql", "generated", "nexus-typegen.ts"),
        schema: join(process.cwd(), "graphql", "generated", "schema.graphql")
    },
    contextType: {
        module: join(process.cwd(), "graphql", "context.ts"),
        export: "Context"
    },
    shouldExitAfterGenerateArtifacts: process.argv.includes("--nexusTypegen")
})
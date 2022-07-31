import { makeSchema } from "nexus";
import { join } from "path"

import * as types from "./types"

export default makeSchema({
    types,
    outputs: {
        typegen: join(__dirname, "nexus-typegen.ts"),
        schema: join(__dirname, "schema.graphql")
    },
    shouldExitAfterGenerateArtifacts: process.argv.includes("--nexusTypegen")
})
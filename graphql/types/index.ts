import {objectType} from "nexus";

export const Link = objectType({
    name: "Link",
    definition(t) {
        t.string("link_name")
    }
})
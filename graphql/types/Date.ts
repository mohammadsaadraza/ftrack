import {asNexusMethod} from "nexus";
import {GraphQLDateTime} from "graphql-scalars";

export const Date = asNexusMethod(GraphQLDateTime, "datetime")
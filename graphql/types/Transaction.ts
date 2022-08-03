import {enumType, objectType} from "nexus";

export const Transaction = objectType({
    name: "Transaction",
    definition(t){
        t.nonNull.id("id")
        t.nonNull.field("type", {
            type: TransactionType
        })
        t.nonNull.field("currency", {
            type: CurrencyType
        })
        t.nonNull.string("description")
        t.nonNull.datetime("date")
        t.nonNull.datetime("createdAt")
        t.nonNull.datetime("updatedAt")
    }
})

export const TransactionType = enumType({
    name: "TransactionCategory",
    members: ["Income", "Expense"]
})

export const CurrencyType = enumType({
    name: "CurrencyType",
    members: ["USD", "PKR"]
})
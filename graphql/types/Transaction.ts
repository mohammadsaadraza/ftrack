import {enumType, extendType, intArg, nonNull, objectType, stringArg} from "nexus";

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

export const AddExpense = extendType({
    type: "Mutation",
    definition(t){
        t.nonNull.field("addExpense", {
            type: Transaction,
            args: {
                date: nonNull("DateTime"),
                description: nonNull(stringArg()),
                amount: nonNull(intArg()),
                currency: nonNull(CurrencyType)
            },
            async resolve(parent, args, context){
                const trans =  await context.prisma.transaction.create({
                    data: {
                        type: "Expense",
                        date: args.date,
                        description: args.description,
                        amount: args.amount,
                        currency: args.currency
                    }
                })
                console.log(trans)
                return trans
            }
        })
    }
})
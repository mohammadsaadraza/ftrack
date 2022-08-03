import {enumType, extendType, idArg, intArg, nonNull, objectType, stringArg} from "nexus";

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
                return await context.prisma.transaction.create({
                    data: {
                        type: "Expense",
                        date: args.date,
                        description: args.description,
                        amount: args.amount,
                        currency: args.currency
                    }
                })
            }
        })
    }
})


export const AddIncome = extendType({
    type: "Mutation",
    definition(t){
        t.nonNull.field("addIncome", {
            type: Transaction,
            args: {
                date: nonNull("DateTime"),
                description: nonNull(stringArg()),
                amount: nonNull(intArg()),
                currency: nonNull(CurrencyType)
            },
            async resolve(parent, args, context){
                return await context.prisma.transaction.create({
                    data: {
                        type: "Income",
                        date: args.date,
                        description: args.description,
                        amount: args.amount,
                        currency: args.currency
                    }
                })
            }
        })
    }
})

export const getTransactions = extendType({
    type: "Query",
    definition(t){
        t.nonNull.list.nonNull.field("getTransactions", {
            type: Transaction,
            args: {
                type: TransactionType,
                currency: CurrencyType
            },
            resolve: async (parent, args, context) => {
                const where = {}
                for (let key in args) {
                    // @ts-ignore
                    if(args[key]){
                        // @ts-ignore
                        where[key] = args[key]
                    }
                }

                return await context.prisma.transaction.findMany({
                    where
                })
            }
        })
    }
})

export const getOneTransaction = extendType({
    type: "Query",
    definition(t) {
        t.field("getOneTransaction", {
            type: Transaction,
            args:{
                id: nonNull(idArg())
            },
            async resolve(parent, args,context){
                return await context.prisma.transaction.findUnique({
                    where: {
                        id: args.id
                    }
                })
            }
        })
    }
})
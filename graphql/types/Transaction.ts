import { AuthenticationError } from "apollo-server-micro";
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
        t.nonNull.int("amount")
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

                if (!context.user) {
                  throw new AuthenticationError(
                    "Token Expired. Unauthenticated"
                  );
                }
                
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

                if (!context.user) {
                  throw new AuthenticationError(
                    "Token Expired. Unauthenticated"
                  );
                }

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
                currency: CurrencyType,
                contains: stringArg(),
                take: intArg(),
                skip: intArg()
            },
            resolve: async (parent, args, context) => {

                if(!context.user){
                    throw new AuthenticationError("Token Expired. Unauthenticated")
                }

                const where: any = {}
                for (let key in args) {
                    // @ts-ignore
                    if(args[key]){

                      if (key == "contains") {

                        where.description = {
                          // @ts-ignore
                          contains: args[key],
                        };
                        continue;
                      }
                      else if (key == "take" || key == "skip") {
                        continue;
                      }

                      // @ts-ignore
                      where[key] = args[key];
                    }
                }

                return await context.prisma.transaction.findMany({
                    where,
                    take: args.take || undefined,
                    skip: args.skip || undefined
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

                if (!context.user) {
                  throw new AuthenticationError(
                    "Token Expired. Unauthenticated"
                  );
                }

                return await context.prisma.transaction.findUnique({
                    where: {
                        id: args.id
                    }
                })
            }
        })
    }
})

export const updateTransaction = extendType({
    type: "Mutation",
    definition(t){
        t.nonNull.field("updateTransaction", {
            type: Transaction,
            args: {
                id: nonNull(idArg()),
                date: "DateTime",
                description: stringArg(),
                amount: intArg(),
                currency: CurrencyType,
                type: TransactionType
            },
            async resolve(parent, args, context){
                    
                    if (!context.user) {
                    throw new AuthenticationError(
                        "Token Expired. Unauthenticated"
                    );
                    }
    
                    return await context.prisma.transaction.update({
                        where: {
                            id: args.id
                        },
                        //@ts-ignore
                        data: args
                    })
            }
        })
    }
})
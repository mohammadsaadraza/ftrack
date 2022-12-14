/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  CurrencyType: "PKR" | "USD"
  TransactionCategory: "Expense" | "Income"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  AuthResponse: { // root type
    access_token: string; // String!
    refresh_token: string; // String!
  }
  Mutation: {};
  Query: {};
  Transaction: { // root type
    amount: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    currency: NexusGenEnums['CurrencyType']; // CurrencyType!
    date: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: string; // ID!
    type: NexusGenEnums['TransactionCategory']; // TransactionCategory!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  AuthResponse: { // field return type
    access_token: string; // String!
    refresh_token: string; // String!
  }
  Mutation: { // field return type
    addExpense: NexusGenRootTypes['Transaction']; // Transaction!
    addIncome: NexusGenRootTypes['Transaction']; // Transaction!
    deleteTransaction: NexusGenRootTypes['Transaction']; // Transaction!
    updateTransaction: NexusGenRootTypes['Transaction']; // Transaction!
  }
  Query: { // field return type
    authenticate: NexusGenRootTypes['AuthResponse']; // AuthResponse!
    getOneTransaction: NexusGenRootTypes['Transaction'] | null; // Transaction
    getTransactions: NexusGenRootTypes['Transaction'][]; // [Transaction!]!
    refresh: NexusGenRootTypes['AuthResponse']; // AuthResponse!
  }
  Transaction: { // field return type
    amount: number; // Int!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    currency: NexusGenEnums['CurrencyType']; // CurrencyType!
    date: NexusGenScalars['DateTime']; // DateTime!
    description: string; // String!
    id: string; // ID!
    type: NexusGenEnums['TransactionCategory']; // TransactionCategory!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
}

export interface NexusGenFieldTypeNames {
  AuthResponse: { // field return type name
    access_token: 'String'
    refresh_token: 'String'
  }
  Mutation: { // field return type name
    addExpense: 'Transaction'
    addIncome: 'Transaction'
    deleteTransaction: 'Transaction'
    updateTransaction: 'Transaction'
  }
  Query: { // field return type name
    authenticate: 'AuthResponse'
    getOneTransaction: 'Transaction'
    getTransactions: 'Transaction'
    refresh: 'AuthResponse'
  }
  Transaction: { // field return type name
    amount: 'Int'
    createdAt: 'DateTime'
    currency: 'CurrencyType'
    date: 'DateTime'
    description: 'String'
    id: 'ID'
    type: 'TransactionCategory'
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addExpense: { // args
      amount: number; // Int!
      currency: NexusGenEnums['CurrencyType']; // CurrencyType!
      date: NexusGenScalars['DateTime']; // DateTime!
      description: string; // String!
    }
    addIncome: { // args
      amount: number; // Int!
      currency: NexusGenEnums['CurrencyType']; // CurrencyType!
      date: NexusGenScalars['DateTime']; // DateTime!
      description: string; // String!
    }
    deleteTransaction: { // args
      id: string; // ID!
    }
    updateTransaction: { // args
      amount?: number | null; // Int
      currency?: NexusGenEnums['CurrencyType'] | null; // CurrencyType
      date?: NexusGenScalars['DateTime'] | null; // DateTime
      description?: string | null; // String
      id: string; // ID!
      type?: NexusGenEnums['TransactionCategory'] | null; // TransactionCategory
    }
  }
  Query: {
    authenticate: { // args
      password: string; // String!
    }
    getOneTransaction: { // args
      id: string; // ID!
    }
    getTransactions: { // args
      contains?: string | null; // String
      currency?: NexusGenEnums['CurrencyType'] | null; // CurrencyType
      skip?: number | null; // Int
      take?: number | null; // Int
      type?: NexusGenEnums['TransactionCategory'] | null; // TransactionCategory
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}
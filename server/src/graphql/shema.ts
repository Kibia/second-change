import { GraphQLSchema } from "graphql";
import { RootQueryType } from "./RootQueryType";
import { RootMutationType } from "./RootMutationType";

export const Schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
  //subscription: RootSubscriptionType
});

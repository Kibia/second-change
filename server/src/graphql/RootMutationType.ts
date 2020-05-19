import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { DogBaseMutation } from "./mutations/DogBaseMutation";

export const RootMutationType = new GraphQLObjectType({
  name: "RootMutationType",
  description: "Base Mutation Type",
  fields: () => ({
    dogMutation: {
      type: DogBaseMutation,
      description: DogBaseMutation.description,
      resolve: () => {
        return {};
      },
    },
  }),
});

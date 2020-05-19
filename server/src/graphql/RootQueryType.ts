import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { DogType } from "./types/IDogType";
import { IDog } from "../mongo/models/dog.model";

export const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    FindDogs: {
      type: new GraphQLList(DogType),
      resolve(obj, args, ctx) {
        return {};
      },
    },
    FindDogById: {
      type: DogType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(obj, args, ctx) {
        return "one dog";
      },
    },
  },
});

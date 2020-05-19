import {
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} from "graphql";

export interface IDogType {
  id: number;
}

export interface IRequesterType {
  requester_id: number;
}

export interface IDogInputType {
  dogName: string;
}

export interface IDogUpdateInputType {
  _id: string;
  dogName: string;
}

export const DogType: GraphQLObjectType = new GraphQLObjectType({
  name: "Dog",
  description: "Classic Dog Type",
  fields: () => ({
    _id: {
      type: GraphQLID,
      description: "The dog id.",
    },
    dogName: {
      type: GraphQLString,
      description: "The dogs's name.",
    },
  }),
});

export const DogListType = new GraphQLObjectType({
  name: "DogList",
  description: DogType.description,
  fields: () => ({
    count: {
      type: GraphQLInt,
      description: "Total number of Dogs",
    },
    data: {
      type: new GraphQLList(DogType),
      description: DogType.description,
      resolve: (dataObject) => {
        return dataObject.users;
      },
    },
  }),
});

export const DogInputType = new GraphQLInputObjectType({
  name: "DogInputType",
  description: "Input types for a dog",
  fields: () => ({
    dogName: {
      type: GraphQLString,
      description: "The dog's name.",
    },
  }),
});

export const DogUpdateInputType = new GraphQLInputObjectType({
  name: "DogUpdateInputType",
  description: "Input types to update a dog",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: "The dog id.",
    },
    ...DogInputType.getFields(),
  }),
});

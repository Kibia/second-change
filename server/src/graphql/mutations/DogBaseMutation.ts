import { GraphQLObjectType } from "graphql";
import { DogType, DogInputType, DogUpdateInputType } from "../types/IDogType";
import { createDog, updateDog } from "../../mongo/queries/DogQueries";

const CreateDogQuery = {
  type: DogType,
  description: DogType.description,
  args: {
    input: {
      type: DogInputType,
      description: DogInputType.description,
    },
  },
  resolve: (root: any, args: any) => {
    return createDog(args.input);
  },
};

const UpdateDogQuery = {
  type: DogType,
  description: DogType.description,
  args: {
    input: {
      type: DogUpdateInputType,
      description: DogUpdateInputType.description,
    },
  },
  resolve: (root: any, args: any) => {
    return updateDog(args.input);
  },
};

export const DogBaseMutation = new GraphQLObjectType({
  name: "DogMutation",
  description: "The dog mutation",
  fields: () => ({
    create: CreateDogQuery,
    update: UpdateDogQuery,
  }),
});

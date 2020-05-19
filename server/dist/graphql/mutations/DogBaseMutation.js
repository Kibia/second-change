"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogBaseMutation = void 0;
var graphql_1 = require("graphql");
var IDogType_1 = require("../types/IDogType");
var DogQueries_1 = require("../../mongo/queries/DogQueries");
var CreateDogQuery = {
    type: IDogType_1.DogType,
    description: IDogType_1.DogType.description,
    args: {
        input: {
            type: IDogType_1.DogInputType,
            description: IDogType_1.DogInputType.description,
        },
    },
    resolve: function (root, args) {
        return DogQueries_1.createDog(args.input);
    },
};
var UpdateDogQuery = {
    type: IDogType_1.DogType,
    description: IDogType_1.DogType.description,
    args: {
        input: {
            type: IDogType_1.DogUpdateInputType,
            description: IDogType_1.DogUpdateInputType.description,
        },
    },
    resolve: function (root, args) {
        return DogQueries_1.updateDog(args.input);
    },
};
exports.DogBaseMutation = new graphql_1.GraphQLObjectType({
    name: "DogMutation",
    description: "The dog mutation",
    fields: function () { return ({
        create: CreateDogQuery,
        update: UpdateDogQuery,
    }); },
});

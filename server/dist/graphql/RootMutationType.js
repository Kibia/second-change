"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootMutationType = void 0;
var graphql_1 = require("graphql");
var DogBaseMutation_1 = require("./mutations/DogBaseMutation");
exports.RootMutationType = new graphql_1.GraphQLObjectType({
    name: "RootMutationType",
    description: "Base Mutation Type",
    fields: function () { return ({
        dogMutation: {
            type: DogBaseMutation_1.DogBaseMutation,
            description: DogBaseMutation_1.DogBaseMutation.description,
            resolve: function () {
                return {};
            },
        },
    }); },
});

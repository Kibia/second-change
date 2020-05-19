"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootQueryType = void 0;
var graphql_1 = require("graphql");
var IDogType_1 = require("./types/IDogType");
exports.RootQueryType = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        FindDogs: {
            type: new graphql_1.GraphQLList(IDogType_1.DogType),
            resolve: function (obj, args, ctx) {
                return {};
            },
        },
        FindDogById: {
            type: IDogType_1.DogType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve: function (obj, args, ctx) {
                return "one dog";
            },
        },
    },
});

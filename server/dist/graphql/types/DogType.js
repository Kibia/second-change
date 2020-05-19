"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogInputTypes = exports.IDogType = void 0;
var graphql_1 = require("graphql");
exports.IDogType = new graphql_1.GraphQLObjectType({
    name: "IDogType",
    description: "Dog type defintion",
    fields: function () { return ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    }); },
});
exports.DogInputTypes = new graphql_1.GraphQLInputObjectType({
    name: "DogInput",
    description: "Input payload for creating dog",
    fields: function () { return ({
        name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
    }); },
});

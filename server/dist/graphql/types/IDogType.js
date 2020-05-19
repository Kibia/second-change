"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DogUpdateInputType = exports.DogInputType = exports.DogListType = exports.DogType = void 0;
var graphql_1 = require("graphql");
exports.DogType = new graphql_1.GraphQLObjectType({
    name: "Dog",
    description: "Classic Dog Type",
    fields: function () { return ({
        _id: {
            type: graphql_1.GraphQLID,
            description: "The dog id.",
        },
        dogName: {
            type: graphql_1.GraphQLString,
            description: "The dogs's name.",
        },
    }); },
});
exports.DogListType = new graphql_1.GraphQLObjectType({
    name: "DogList",
    description: exports.DogType.description,
    fields: function () { return ({
        count: {
            type: graphql_1.GraphQLInt,
            description: "Total number of Dogs",
        },
        data: {
            type: new graphql_1.GraphQLList(exports.DogType),
            description: exports.DogType.description,
            resolve: function (dataObject) {
                return dataObject.users;
            },
        },
    }); },
});
exports.DogInputType = new graphql_1.GraphQLInputObjectType({
    name: "DogInputType",
    description: "Input types for a dog",
    fields: function () { return ({
        dogName: {
            type: graphql_1.GraphQLString,
            description: "The dog's name.",
        },
    }); },
});
exports.DogUpdateInputType = new graphql_1.GraphQLInputObjectType({
    name: "DogUpdateInputType",
    description: "Input types to update a dog",
    fields: function () { return (__assign({ id: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
            description: "The dog id.",
        } }, exports.DogInputType.getFields())); },
});

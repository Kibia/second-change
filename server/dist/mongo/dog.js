"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dog = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var IDogType_1 = require("../graphql/types/IDogType");
exports.Dog = mongoose_1.default.model(IDogType_1.DogType);

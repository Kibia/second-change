"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.getUsers = exports.getUser = void 0;
var fetch_1 = require("../util/fetch");
exports.getUser = function (args) {
    var params = "users/" + args.id + ".json";
    return fetch_1.fetchData(params).then(function (result) { return result.user; });
};
exports.getUsers = function (_a) {
    var _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.per_page, per_page = _c === void 0 ? 5 : _c;
    var params = "users.json?page=" + page + "&per_page=" + per_page;
    return fetch_1.fetchData(params).then(function (result) { return result; });
};
exports.createUser = function (args) {
    var param = "users.json";
    var data = { user: args };
    return fetch_1.sendData(param, data).then(function (result) { return result.user; });
};
exports.updateUser = function (args) {
    var param = "users/" + args.id + ".json";
    var data = { user: args };
    return fetch_1.sendData(param, data, "PUT").then(function (result) { return result.user; });
};

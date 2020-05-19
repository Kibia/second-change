"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_caching_1 = require("apollo-server-caching");
const apollo_cache_control_1 = require("apollo-cache-control");
const crypto_1 = require("crypto");
var SessionMode;
(function (SessionMode) {
    SessionMode[SessionMode["NoSession"] = 0] = "NoSession";
    SessionMode[SessionMode["Private"] = 1] = "Private";
    SessionMode[SessionMode["AuthenticatedPublic"] = 2] = "AuthenticatedPublic";
})(SessionMode || (SessionMode = {}));
function sha(s) {
    return crypto_1.createHash('sha256')
        .update(s)
        .digest('hex');
}
function cacheKeyString(key) {
    return sha(JSON.stringify(key));
}
function isGraphQLQuery(requestContext) {
    return (requestContext.operation && requestContext.operation.operation === 'query');
}
function plugin(options = Object.create(null)) {
    return {
        requestDidStart(outerRequestContext) {
            const cache = new apollo_server_caching_1.PrefixingKeyValueCache(options.cache || outerRequestContext.cache, 'fqc:');
            let sessionId = null;
            let baseCacheKey = null;
            let age = null;
            return {
                responseForOperation(requestContext) {
                    return __awaiter(this, void 0, void 0, function* () {
                        requestContext.metrics.responseCacheHit = false;
                        if (!isGraphQLQuery(requestContext)) {
                            return null;
                        }
                        function cacheGet(contextualCacheKeyFields) {
                            return __awaiter(this, void 0, void 0, function* () {
                                const key = cacheKeyString(Object.assign(Object.assign({}, baseCacheKey), contextualCacheKeyFields));
                                const serializedValue = yield cache.get(key);
                                if (serializedValue === undefined) {
                                    return null;
                                }
                                const value = JSON.parse(serializedValue);
                                requestContext.overallCachePolicy = value.cachePolicy;
                                requestContext.metrics.responseCacheHit = true;
                                age = Math.round((+new Date() - value.cacheTime) / 1000);
                                return { data: value.data };
                            });
                        }
                        let extraCacheKeyData = null;
                        if (options.sessionId) {
                            sessionId = yield options.sessionId(requestContext);
                        }
                        if (options.extraCacheKeyData) {
                            extraCacheKeyData = yield options.extraCacheKeyData(requestContext);
                        }
                        baseCacheKey = {
                            source: requestContext.source,
                            operationName: requestContext.operationName,
                            variables: Object.assign({}, (requestContext.request.variables || {})),
                            extra: extraCacheKeyData,
                        };
                        if (options.shouldReadFromCache &&
                            !options.shouldReadFromCache(requestContext)) {
                            return null;
                        }
                        if (sessionId === null) {
                            return cacheGet({ sessionMode: SessionMode.NoSession });
                        }
                        else {
                            const privateResponse = yield cacheGet({
                                sessionId,
                                sessionMode: SessionMode.Private,
                            });
                            if (privateResponse !== null) {
                                return privateResponse;
                            }
                            return cacheGet({ sessionMode: SessionMode.AuthenticatedPublic });
                        }
                    });
                },
                willSendResponse(requestContext) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (!isGraphQLQuery(requestContext)) {
                            return;
                        }
                        if (requestContext.metrics.responseCacheHit) {
                            const http = requestContext.response.http;
                            if (http && age !== null) {
                                http.headers.set('age', age.toString());
                            }
                            return;
                        }
                        if (options.shouldWriteToCache &&
                            !options.shouldWriteToCache(requestContext)) {
                            return;
                        }
                        const { response, overallCachePolicy } = requestContext;
                        if (response.errors ||
                            !response.data ||
                            !overallCachePolicy ||
                            overallCachePolicy.maxAge <= 0) {
                            return;
                        }
                        const data = response.data;
                        if (!baseCacheKey) {
                            throw new Error('willSendResponse called without error, but execute not called?');
                        }
                        function cacheSetInBackground(contextualCacheKeyFields) {
                            const key = cacheKeyString(Object.assign(Object.assign({}, baseCacheKey), contextualCacheKeyFields));
                            const value = {
                                data,
                                cachePolicy: overallCachePolicy,
                                cacheTime: +new Date(),
                            };
                            const serializedValue = JSON.stringify(value);
                            cache
                                .set(key, serializedValue, { ttl: overallCachePolicy.maxAge })
                                .catch(console.warn);
                        }
                        const isPrivate = overallCachePolicy.scope === apollo_cache_control_1.CacheScope.Private;
                        if (isPrivate) {
                            if (!options.sessionId) {
                                console.warn('A GraphQL response used @cacheControl or setCacheHint to set cache hints with scope ' +
                                    "Private, but you didn't define the sessionId hook for " +
                                    'apollo-server-plugin-response-cache. Not caching.');
                                return;
                            }
                            if (sessionId === null) {
                                return;
                            }
                            cacheSetInBackground({
                                sessionId,
                                sessionMode: SessionMode.Private,
                            });
                        }
                        else {
                            cacheSetInBackground({
                                sessionMode: sessionId === null
                                    ? SessionMode.NoSession
                                    : SessionMode.AuthenticatedPublic,
                            });
                        }
                    });
                },
            };
        },
    };
}
exports.default = plugin;
//# sourceMappingURL=ApolloServerPluginResponseCache.js.map
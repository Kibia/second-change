import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { GraphQLRequestContext } from 'apollo-server-types';
import { KeyValueCache } from 'apollo-server-caching';
import { ValueOrPromise } from 'apollo-server-types';
interface Options<TContext = Record<string, any>> {
    cache?: KeyValueCache;
    sessionId?(requestContext: GraphQLRequestContext<TContext>): ValueOrPromise<string | null>;
    extraCacheKeyData?(requestContext: GraphQLRequestContext<TContext>): ValueOrPromise<any>;
    shouldReadFromCache?(requestContext: GraphQLRequestContext<TContext>): ValueOrPromise<boolean>;
    shouldWriteToCache?(requestContext: GraphQLRequestContext<TContext>): ValueOrPromise<boolean>;
}
export default function plugin(options?: Options): ApolloServerPlugin;
export {};
//# sourceMappingURL=ApolloServerPluginResponseCache.d.ts.map
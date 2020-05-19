import { ApolloServer } from "apollo-server-express";
import { Db } from "mongodb";
import { Schema } from "./shema";

export default function server(db: Db) {
  return new ApolloServer({
    schema: Schema,
    subscriptions: {
      path: "/subscriptions",
      onConnect: async () => {
        console.log(
          "Subscription client connected using Apollo server's built-in SubscriptionServer."
        );
      },
      onDisconnect: async () => {
        console.log("Subscription client disconnected.");
      },
    },
    cacheControl: {
      defaultMaxAge: 5,
    },
    introspection: true,
  });
}

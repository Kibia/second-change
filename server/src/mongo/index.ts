import mongoose from "mongoose";

export async function connect() {
  const URL = process.env.MONGO_URL || "local mongodb URL";

  await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("🔗 Connected to Mongo: ", mongoose.connection.name);

  return mongoose.connection.db;
}

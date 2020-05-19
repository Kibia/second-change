import mongoose from "mongoose";

export async function sendData(collectionName: string, data: string) {
  mongoose.connection.db.collection(collectionName).insertOne(data);
}

import mongoose, { Schema, Document } from "mongoose";

export interface IDog extends Document {
  dogName: string;
}

const DogSchema: Schema = new Schema({
  dogName: { type: String, required: true },
});

export default mongoose.model<IDog>("Dog", DogSchema);

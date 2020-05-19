/*import { fetchData, sendData } from "../util/fetch";
import { IListArgumentsType } from "../util/list";*/
import {
  IDogType,
  IDogInputType,
  IDogUpdateInputType,
} from "../../graphql/types/IDogType";
import Dog from "../models/dog.model";
import { sendData } from "../requests/sendData";
import mongoose from "mongoose";

export const getDog = (args: IDogType) => {
  console.log("🚀Dog gets returned ");
  /*const params = "dogs/" + args.id + ".json";

  return fetchData(params).then((result: any) => result.dog);*/
};

export const getDogs = () => {};

export const createDog = async (args: IDogInputType) => {
  console.log("🚀Dog gets created ");
  const newDog = new Dog({
    dogName: args.dogName,
  });
  await newDog.save().then((result: any) => result.newDog);
  return newDog;
};

export const updateDog = (args: IDogUpdateInputType) => {
  console.log("🚀Dog gets updated ");
  /*const param = "dogs/" + args.id + ".json";
  const data = { dog: args };

  return sendData(param, data, "PUT").then((result: any) => result.dog);*/
};

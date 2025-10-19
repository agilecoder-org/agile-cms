import { Types } from "mongoose";

export interface IApiKey {
  _id?: Types.ObjectId;
  name: string;
  key: string;
  blogId: Types.ObjectId;
  origin: string;
  lastUsed?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
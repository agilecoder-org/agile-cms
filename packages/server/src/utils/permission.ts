import PermissionModel from "../domains/permission/model";
import { Types } from "mongoose";

export const checkUserIsOwner = async (userId: string) => {
  return await PermissionModel.exists({
    user_id: new Types.ObjectId(userId),
    role: "owner",
  });
};
import { Schema, Document, Types, model } from "mongoose";

enum Role {
  ADMIN = "owner",
  EDITOR = "admin",
  VIEWER = "author",
}

interface IPermission extends Document {
  user_id: Types.ObjectId;
  role: Role;
}

const PermissionsSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, ref: "User", required: true },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },
  },
  { timestamps: true }
);

const PermissionsModel = model<IPermission>("Permission", PermissionsSchema);
export default PermissionsModel;

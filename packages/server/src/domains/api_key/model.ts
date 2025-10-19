import { Schema, model, Types } from "mongoose";
import { IApiKey } from "./types";

const apiKeySchema = new Schema<IApiKey>({
  name: { type: String, required: true, unique: true },
  key: { type: String, required: true, unique: true },
  blogId: { type: Schema.Types.ObjectId, ref: "BlogSite", required: true },
  lastUsed: { type: Date, default: null },
  origin: { type: String, required: true }
}, {
  timestamps: true
});

const ApiKeyModel = model("ApiKey", apiKeySchema);
export default ApiKeyModel;

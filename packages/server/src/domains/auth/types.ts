import { Request } from "express";
import { IBlog } from "../blog/types";
import { IApiKey } from "../api_key/types";

export interface ExtendedRequest extends Request {
  user: {
    userId: string;
    username: string;
    isOwner: boolean;
  };
  host_info?: {
    fullHost: string;
    subdomain: string | null;
  };
  blog: IBlog,
  apiKey: IApiKey,
}

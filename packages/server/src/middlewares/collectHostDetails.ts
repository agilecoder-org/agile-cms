import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../domains/auth/types";
import logger from "../configs/logger";

const logHosts = (req: Request, res: Response, next: NextFunction) => {
  const fullHost = req.headers.host || "";
  const hostname = fullHost.split(":")[0];
  const parts = hostname.split(".");

  let subdomain: string | null = null;

  if (parts.length > 2) {
    subdomain = parts.slice(0, parts.length - 2).join(".");
  } else if (parts.length === 2 && hostname !== "localhost") {
    subdomain = parts[0];
  }

  const extendedReq = req as ExtendedRequest;

  extendedReq.host_info = {
    fullHost,
    subdomain,
  };

  logger.host(fullHost);

  next();
};

export default logHosts;

import morgan, { FormatFn } from "morgan";
import { Request, Response } from "express";
import { ExtendedRequest } from "../domains/auth/types";
import moment from "moment";

morgan.token("userId", (req: Request) =>
  (req as ExtendedRequest).user ? (req as ExtendedRequest).user.username : "guest"
);

const logFormat: FormatFn<Request, Response> = (tokens, req, res) => {
  const status = tokens.status(req, res);
  const statusColor =
    Number(status) >= 500
      ? "\x1b[31m"
      : Number(status) >= 400
        ? "\x1b[33m"
        : Number(status) >= 300
          ? "\x1b[36m"
          : "\x1b[32m";

  const responseTime = tokens["response-time"](req, res) as string;
  const responseTimeColor =
    parseInt(responseTime, 10) >= 1000 ? "\x1b[31m" : parseInt(responseTime, 10) >= 500 ? "\x1b[33m" : "\x1b[32m";

  const userId = tokens.userId(req, res);
  const userIdColor = userId === "guest" ? "\x1b[90m" : "\x1b[37m";
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  return `${date} http: ${tokens.method(req, res)} ${tokens.url(req, res)} ${statusColor}${status}\x1b[0m ${responseTimeColor}${responseTime}ms\x1b[0m - ${tokens.res(req, res, "content-length") as string} bytes - ${userIdColor}${userId}\x1b[0m`;
};

const httpLogger = morgan(logFormat);
export default httpLogger;

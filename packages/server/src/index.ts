import express, { NextFunction, Request, Response } from "express";
import vhost from "vhost";
import { corsFix } from "./libs/cors";
import { requestBodyParser } from "./libs/bodyParser";
import cookieParser from "./libs/cookieParser";

import { mainRouter } from "./routes";
import httpLogger from "./libs/morgan";

import { multiTenantPostRouter } from "./domains/post/router";
import collectHostDetails from "./middlewares/collectHostDetails";
import { connectDatabase } from "./configs/db";
import logger from "./configs/logger";
import { cronJobs } from "./jobs/cron";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(httpLogger);
app.use(corsFix);
app.use(requestBodyParser);
app.use(cookieParser);
app.use(collectHostDetails);

app.use((req: Request, res: Response, next: NextFunction) => {
  const host = req.headers.host || "";
  
  if (host.startsWith("localhost") || host === "cms-server-agilecoder.vercel.app") {
    mainRouter(req, res, next);
  } else {
    multiTenantPostRouter(req, res, next);
  }
});

app.get("/", (req, res) => {
  res.send("The Server is Running Fine 🚀");
});

const PORT = Number(process.env.PORT) || 3001;

connectDatabase(() => {
  if (process.env.VERCEL !== "1") {
    app.listen(PORT, () => {
      logger.info(`Server is running at http://localhost:${PORT} 🚀`);
    });
  }
  
  cronJobs();
});

export default app;

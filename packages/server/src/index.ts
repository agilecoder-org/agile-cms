import express from "express";
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

const HOST = process.env.HOST || "localhost";

app.use(httpLogger);
app.use(corsFix);
app.use(requestBodyParser);
app.use(cookieParser);
app.use(collectHostDetails);

app.use(vhost(HOST, mainRouter as any));
app.use(vhost(`*.${HOST}`, multiTenantPostRouter as any));

app.get("/", (req, res) => {
  res.send("The Server is Running Fine 🚀");
});

const PORT = Number(process.env.PORT) || 3001;

connectDatabase(() => {
  if (process.env.VERCEL !== "1") {
    app.listen(PORT, () => {
      logger.info(`Server is running at http://${HOST}:${PORT} 🚀`);
    });
  }
  
  cronJobs();
});

export default app;

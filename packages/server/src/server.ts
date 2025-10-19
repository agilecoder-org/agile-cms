import express from "express";
import vhost from "vhost";
import { corsFix } from "./libs/cors";
import { requestBodyParser } from "./libs/bodyParser";
import cookieParser from "./libs/cookieParser";

import { mainRouter } from "./routes";
import httpLogger from "./libs/morgan";

import { multiTenantPostRouter } from "./domains/post/router";
import collectHostDetails from "./middlewares/collectHostDetails";

const app = express();

app.use(httpLogger);
app.use(corsFix);
app.use(requestBodyParser);
app.use(cookieParser);
app.use(collectHostDetails);

app.use(vhost("localhost", mainRouter as any));
app.use(vhost("*.localhost", multiTenantPostRouter as any));

app.get("/", (req, res) => {
  res.send("The Server is Running Fine 🚀");
});

export default app;

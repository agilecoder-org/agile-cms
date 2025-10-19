import { RequestHandler, Router } from "express";
import {
  createApiKey,
  getApiKeysByBlog,
  deleteApiKey,
} from "./controller";

import { authorise } from "../../middlewares/authoriseRequests";
import { allowOwnersOnly } from "../../middlewares/roleMiddlewares";

const apiKeyRouter = Router();

apiKeyRouter.use(authorise as RequestHandler, allowOwnersOnly as RequestHandler);

apiKeyRouter.post("/", createApiKey as RequestHandler);
apiKeyRouter.get("/", getApiKeysByBlog as RequestHandler);
apiKeyRouter.delete("/:id", deleteApiKey as RequestHandler);

export { apiKeyRouter };

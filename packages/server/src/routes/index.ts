import { RequestHandler, Router } from "express";
import { authRouter } from "../domains/auth/router";
import { blogRouter } from "../domains/blog/router";
import { postRouter } from "../domains/post/router";
import { allowOwnersOnly } from "../middlewares/roleMiddlewares";
import { authorise } from "../middlewares/authoriseRequests";
import { categoryRouter } from "../domains/category/routes";
import { apiKeyRouter } from "../domains/api_key/routes";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/blog", authorise as RequestHandler, allowOwnersOnly as RequestHandler, blogRouter);
mainRouter.use("/post", postRouter);
mainRouter.use("/category", categoryRouter);
mainRouter.use("/api-key", apiKeyRouter);

export { mainRouter };

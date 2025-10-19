import { RequestHandler, Router } from "express";
import { changeStatus, createPost, deletePost, editPost, getPostById, getPosts } from "./postController";
import { getPostByIdByBlogId, getPostsByBlogId } from "./multiTenantController";
import { authorise } from "../../middlewares/authoriseRequests";
import { validatePostInput } from "../../middlewares/input-validations/create-post";
import { checkApiKey } from "../../middlewares/checkKey";

const postRouter = Router();
const multiTenantPostRouter = Router();

postRouter.post("/create", 
  authorise as RequestHandler, 
  validatePostInput as RequestHandler, 
  createPost as RequestHandler
);

postRouter.put("/:id",   
  authorise as RequestHandler, 
  validatePostInput as RequestHandler,
  editPost as RequestHandler);

postRouter.delete("/:id", authorise as RequestHandler, deletePost as RequestHandler);
postRouter.get("/", getPosts as RequestHandler);
postRouter.get("/:id", authorise as RequestHandler, getPostById as RequestHandler);
postRouter.patch("/status/:id", authorise as RequestHandler, changeStatus as RequestHandler)

multiTenantPostRouter.use(checkApiKey as RequestHandler);
multiTenantPostRouter.get("/", getPostsByBlogId as RequestHandler);
multiTenantPostRouter.get("/:id", getPostByIdByBlogId as RequestHandler);

export { postRouter, multiTenantPostRouter };

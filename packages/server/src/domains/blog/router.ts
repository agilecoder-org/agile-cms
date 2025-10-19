import { RequestHandler, Router } from "express";
import { createBlogSite, getBlogSiteById, getBlogSites } from "./controller";

const blogRouter = Router();

blogRouter.post("/create", createBlogSite as RequestHandler);
blogRouter.get("/", getBlogSites);
blogRouter.get("/:id", getBlogSiteById as RequestHandler);

export { blogRouter };

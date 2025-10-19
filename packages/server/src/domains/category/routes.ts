import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./controller";

const categoryRouter = Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById as any);
categoryRouter.put("/:id", updateCategory as any);
categoryRouter.delete("/:id", deleteCategory as any);

export { categoryRouter };

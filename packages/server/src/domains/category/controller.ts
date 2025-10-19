import { Request, Response } from "express";
import { Category } from "./model";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, blog } = req.body;

    const category = new Category({ name, blog });
    await category.save();

    res.status(201).json(category);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { blog } = req.query;
    const query = blog ? { blog } : {};

    const categories = await Category.find(query);
    res.status(200).json(categories);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updated);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

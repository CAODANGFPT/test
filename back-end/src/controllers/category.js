import Category from "../models/category";
import { categorySchema } from "../schemas/category";

export const list = async (req, res) => {
    try {
        const products = await Category.getAllCategory();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const show = async (req, res) => {
    try {
        const product = await Category.getCategoryById(req.params.id);
        if (!product) {
            res.status(404).json({ error: "Category not found" });
        } else {
            res.json(product);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const showProductsCate = async (req, res) => {
  try {
      const product = await Category.getAllProductsCate(req.params.id);
      if (!product) {
          res.status(404).json({ error: "Category not found" });
      } else {
          res.json(product);
      }
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};
export const create = async (req, res) => {
    try {
        const { name, image } = req.body;
        const { error } = categorySchema.validate(req.body);
        if (error) {
          const errors = error.details.map((errorItem) => errorItem.message);
          return res.status(400).json({
            message: errors,
          });
        }
        const categoryId = await Category.createCategory(name, image);
        res.json({ id: categoryId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const update = async (req, res) => {
    try {
        const { name } = req.body;
        const { error } = categorySchema.validate(req.body);
        if (error) {
          const errors = error.details.map((errorItem) => errorItem.message);
          return res.status(400).json({
            message: errors,
          });
        }
        await Category.updateCategory(req.params.id, name);
        res.json({ message: "Category updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const destroy = async (req, res) => {
    try {
        await Category.deleteCategory(req.params.id);
        res.json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

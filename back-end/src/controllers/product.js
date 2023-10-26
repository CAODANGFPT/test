import Product from "../models/product";
import { productSchema } from "../schemas/product";

export const list = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const listTop6 = async (req, res) => {
  try {
    const products = await Product.getProductTop6();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const show = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(product);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const create = async (req, res) => {
  try {
    const {
      name,
      image,
      brand,
      price,
      discount,
      quantity,
      description,
      category_id,
    } = req.body;
    const { error } = productSchema.validate(req.body);
        if (error) {
          const errors = error.details.map((errorItem) => errorItem.message);
          return res.status(400).json({
            message: errors,
          });
        }
    const productId = await Product.createProduct(
      name,
      image,
      brand,
      price,
      discount,
      quantity,
      description,
      category_id
    );
    res.json({ id: productId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const update = async (req, res) => {
  try {
    const {
      name,
      image,
      brand,
      price,
      discount,
      quantity,
      description,
      category_id,
    } = req.body;
    const { error } = productSchema.validate(req.body);
    if (error) {
      const errors = error.details.map((errorItem) => errorItem.message);
      return res.status(400).json({
        message: errors,
      });
    }
    await Product.updateProduct(
      req.params.id,
      name,
      image,
      brand,
      price,
      discount,
      quantity,
      description,
      category_id
    );
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const destroy = async (req, res) => {
  try {
    await Product.deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

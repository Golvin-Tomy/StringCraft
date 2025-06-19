import Product from "../models/Product.js";

// Add a new product
export const addProduct = async (req, res) => {
  try {
    const { name, category, price, description, image } = req.body;
    const newProduct = new Product({ name, category, price, description, image });
    await newProduct.save();
    res.status(201).json({ msg: "Product added", product: newProduct });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

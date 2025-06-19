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


export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { name, category, price, image, description } = req.body;
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, price, image, description },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

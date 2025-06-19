import express from "express";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct
} from "../controllers/productController.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/", getProducts);


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);

export default router;


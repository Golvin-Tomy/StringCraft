import express from "express";
import { placeOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/place", placeOrder);
router.get("/", getOrders); // Admin will use this to view all orders

export default router;

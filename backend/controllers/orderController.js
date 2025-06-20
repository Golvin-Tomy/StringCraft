import Order from "../models/orderModel.js";

// 🛒 Create a new order
export const placeOrder = async (req, res) => {
  try {
    const { items, total, userName, userEmail } = req.body;

    const newOrder = new Order({
      items,
      total,
      userName,   
      userEmail,  
    });

    await newOrder.save();

    res.status(201).json({ msg: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 📄 Get all orders (for admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

import db from "../db.js";

const getAllOrders = async (req, res) => {
  const userId = req.query.user_id;
  res.json({ message: "get all orders", userId });
};

const createOrder = async (req, res) => {
  res.json({ message: "create order" });
};

const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  res.json({ message: "update order", orderId });
};

export { getAllOrders, createOrder, updateOrder };

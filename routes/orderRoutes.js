import express from "express";
import {
  getAllOrders,
  createOrder,
  updateOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getAllOrders);

router.post("/", createOrder);

router.patch("/:id", updateOrder);

export default router;

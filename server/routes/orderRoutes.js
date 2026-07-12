import express from "express";
import {
  createOrder,
  getOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createOrder); // allows guest table-orders too
router.get("/", protect, adminOnly, getOrders);
router.get("/mine", protect, getMyOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;

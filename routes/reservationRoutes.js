import express from "express";
import {
  createReservation,
  getReservations,
  updateReservationStatus,
} from "../controllers/reservationController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createReservation); // no login required to book a table
router.get("/", protect, adminOnly, getReservations);
router.put("/:id/status", protect, adminOnly, updateReservationStatus);

export default router;

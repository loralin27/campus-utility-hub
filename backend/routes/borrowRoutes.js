import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addItem,
  getItems,
  requestItem,
  approveItem,
} from "../controllers/borrowController.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", protect, addItem);
router.put("/:id/request", protect, requestItem);
router.put("/:id/approve", protect, approveItem);

export default router;
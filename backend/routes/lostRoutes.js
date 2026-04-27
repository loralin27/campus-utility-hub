import express from "express";
import upload from "../middleware/multer.js";
import { protect } from "../middleware/authMiddleware.js";

import {
  addLostItem,
  getLostItems,
  markFound,
  deleteLostItem,
} from "../controllers/lostFoundController.js";

const router = express.Router();

//  get all
router.get("/", getLostItems);

//  add (with image)
router.post("/", protect, upload.single("image"), addLostItem);

//  mark found
router.put("/:id/claim", protect, markFound);

//  delete
router.delete("/:id", protect, deleteLostItem);

export default router;
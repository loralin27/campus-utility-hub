import express from "express";
import upload from "../middleware/multer.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  addResource,
  getResources,
  deleteResource,
} from "../controllers/resourceController.js";

const router = express.Router();

router.get("/", getResources);
router.post("/", protect, upload.single("file"), addResource);
router.delete("/:id", protect, deleteResource);

export default router;
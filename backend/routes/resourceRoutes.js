import express from "express";
import { uploadResource, getResources } from "../controllers/resourceController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/", protect, upload.single("file"), uploadResource);
router.get("/", getResources);

export default router;
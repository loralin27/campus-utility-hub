import express from "express";
import { createItem, getItems } from "../controllers/lostFoundController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), createItem);
router.get("/", getItems);

export default router;
import express from "express";
import {
  loginUser,
  registerUser,
  getAllUsers,
} from "../controllers/authController.js";

// OPTIONAL: protect middleware
// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//  AUTH
router.post("/login", loginUser);
router.post("/register", registerUser);

//  USERS
router.get("/users", getAllUsers);

//  (OPTIONAL SECURE VERSION)
// router.get("/users", protect, getAllUsers);

export default router;
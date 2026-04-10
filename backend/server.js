import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import resourceRoutes from "./routes/resourceRoutes.js";
import lostRoutes from "./routes/lostRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/resources", resourceRoutes);
app.use("/api/lost", lostRoutes);
app.use("/api/borrow", borrowRoutes);

app.listen(5000, () => console.log("Server running"));
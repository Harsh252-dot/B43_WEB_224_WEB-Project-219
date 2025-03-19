import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import householdRoutes from "./routes/householdRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/households", householdRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

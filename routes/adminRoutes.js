import express from "express";
import { registerAdmin, loginAdmin, getAdminDetails } from "../controllar/adminControllar.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/:id", getAdminDetails);

export default router;
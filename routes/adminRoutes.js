import express from "express";
import { registerAdmin, loginAdmin, getAdminDetails, getAllAdmins, updateAdmin, deleteAdmin } from "../controllar/adminControllar.js";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/:id",authenticateUser, getAdminDetails);
router.get("/",authorizeAdmin,  getAllAdmins);
router.put("/:id", updateAdmin);
router.delete("/:id" , deleteAdmin);

export default router;
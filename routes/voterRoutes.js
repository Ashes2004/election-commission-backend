import express from "express";
import { registerVoter, loginVoter, getVoterDetails, getAllVoterDetails, updateVoterDetails, deleteVoter } from "../controllar/voterControllar.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerVoter);
router.post("/login", loginVoter);
router.get("/:id", authenticateUser , getVoterDetails);
router.get("/", getAllVoterDetails);
router.put("/:id" , updateVoterDetails);
router.delete("/:id", deleteVoter);


export default router;
import express from "express";
import { registerCandidate, loginCandidate, getCandidateDetails, updateCandidate, deleteCandidate } from "../controllar/candidateControllar.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerCandidate);
router.post("/login", loginCandidate);
router.get("/:id", authenticateUser, getCandidateDetails);
router.put("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);

export default router;
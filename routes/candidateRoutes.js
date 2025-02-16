import express from "express";
import { registerCandidate, loginCandidate, getCandidateDetails, updateTotalVotes } from "../controllar/candidateControllar.js";

const router = express.Router();

router.post("/register", registerCandidate);
router.post("/login", loginCandidate);
router.get("/:id", getCandidateDetails);
router.put("/:id/vote", updateTotalVotes);

export default router;
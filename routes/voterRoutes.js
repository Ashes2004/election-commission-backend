import express from "express";
import { registerVoter, loginVoter, getVoterDetails, updateVotingStatus } from "../controllar/voterControllar.js";

const router = express.Router();

router.post("/register", registerVoter);
router.post("/login", loginVoter);
router.get("/:id", getVoterDetails);
router.put("/:id/vote", updateVotingStatus);

export default router;
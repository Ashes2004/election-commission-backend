import express from "express";
import { castVote, getAllVotes, getVotesByCandidate, getVotesByElection, getVotesByVoter } from "../controllar/voteControllar.js";

const router = express.Router();

router.post("/", castVote);                      // Cast a vote
router.get("/", getAllVotes);                    // Get all votes
router.get("/election/:electionId", getVotesByElection); // Get votes for a specific election
router.get("/voter/:voterId", getVotesByVoter);  // Get votes by a specific voter
router.get("/candidate/:candidateId", getVotesByCandidate);  // Get votes by a specific voter

export default router;

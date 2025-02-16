import express from "express";
import { createElection, getAllElections, getElectionById, updateElection, deleteElection } from "../controllar/electionControllar.js";

const router = express.Router();

router.post("/", createElection);         // Create an election
router.get("/", getAllElections);         // Get all elections
router.get("/:id", getElectionById);      // Get election by ID
router.put("/:id", updateElection);       // Update an election
router.delete("/:id", deleteElection);    // Delete an election

export default router;

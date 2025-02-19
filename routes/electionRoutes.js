import express from "express";
import { createElection, getAllElections, getElectionById, updateElection, deleteElection } from "../controllar/electionControllar.js";

const router = express.Router();

router.post("/", createElection);        
router.get("/", getAllElections);         
router.get("/:id", getElectionById);      
router.put("/:id", updateElection);       
router.delete("/:id", deleteElection);   

export default router;

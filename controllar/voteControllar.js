import Vote from "../models/Vote.js";
import Election from "../models/Election.js";
import Voter from "../models/Voter.js";
import Candidate from "../models/candidateModel.js";
// Cast a vote
export const castVote = async (req, res) => {
    try {
        const { voter, candidate, election } = req.body;

        // Check if the election is active
        const electionData = await Election.findById(election);
        if (!electionData || !electionData.isActive) {
            return res.status(400).json({ error: "Election is not active or does not exist" });
        }

        // Check if the voter has already voted in this election
        const existingVote = await Vote.findOne({ voter, election });
        if (existingVote) {
            return res.status(400).json({ error: "Voter has already voted in this election" });
        }
        const VoterDetails = await Voter.findById(voter); 
        if (!VoterDetails) {
            return res.status(400).json({ error: "Voter does not exist" });
            }

        const candidateDetails = await Candidate.findById(candidate);
        if (!candidateDetails) {
            return res.status(400).json({ error: "Candidate does not exist" });
            }

         
        // Save the vote
        const newVote = new Vote({ voter, candidate, election });
        VoterDetails.elections.push(newVote);
        candidateDetails.totalVotes +=  1 ;

        await newVote.save();
        await VoterDetails.save();
        await candidateDetails.save();

        res.status(201).json({ message: "Vote cast successfully", vote: newVote });
    } catch (error) {
        res.status(500).json({ error: "Failed to cast vote", details: error.message });
    }
};

// Get all votes
export const getAllVotes = async (req, res) => {
    try {
        const votes = await Vote.find().populate("voter candidate election");
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch votes", details: error.message });
    }
};

// Get votes by election
export const getVotesByElection = async (req, res) => {
    try {
        const votes = await Vote.find({ election: req.params.electionId }).populate("voter candidate");
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch votes for the election", details: error.message });
    }
};

// Get votes by voter
export const getVotesByVoter = async (req, res) => {
    try {
        const votes = await Vote.find({ voter: req.params.voterId }).populate("candidate election");
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch voter's votes", details: error.message });
    }
};


// Get votes by voter
export const getVotesByCandidate = async (req, res) => {
    try {
        const votes = await Vote.find({ candidate: req.params.candidateId }).populate("voter election");
        res.status(200).json(votes);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch voter's votes", details: error.message });
    }
};
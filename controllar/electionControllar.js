import Election from "../models/electionModel.js";

// Create a new election
export const createElection = async (req, res) => {
    try {
        const { name, constituency, candidates, startDate, endDate, isActive } = req.body;
        const newElection = new Election({ name, constituency, candidates, startDate, endDate, isActive });
        await newElection.save();
        res.status(201).json(newElection);
    } catch (error) {
        res.status(500).json({ error: "Failed to create election", details: error.message });
    }
};

// Get all elections
export const getAllElections = async (req, res) => {
    try {
        const elections = await Election.find().populate("candidates");
        res.status(200).json(elections);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch elections", details: error.message });
    }
};

// Get a single election by ID
export const getElectionById = async (req, res) => {
    try {
        const election = await Election.findById(req.params.id).populate("candidates");
        if (!election) return res.status(404).json({ error: "Election not found" });
        res.status(200).json(election);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch election", details: error.message });
    }
};

// Update an election
export const updateElection = async (req, res) => {
    try {
        const updatedElection = await Election.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedElection) return res.status(404).json({ error: "Election not found" });
        res.status(200).json(updatedElection);
    } catch (error) {
        res.status(500).json({ error: "Failed to update election", details: error.message });
    }
};

// Delete an election
export const deleteElection = async (req, res) => {
    try {
        const deletedElection = await Election.findByIdAndDelete(req.params.id);
        if (!deletedElection) return res.status(404).json({ error: "Election not found" });
        res.status(200).json({ message: "Election deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete election", details: error.message });
    }
};

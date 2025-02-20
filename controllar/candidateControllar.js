import Candidate from "../models/candidateModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new candidates
export const registerCandidate = async (req, res) => {
    try {
        const { name, email, aadharNo, party, constituency, symbol, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const candidate = new Candidate({ name, email, aadharNo, party, constituency, symbol, password: hashedPassword });
        await candidate.save();
        res.status(201).json({ message: "Candidate registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login candidate
export const loginCandidate = async (req, res) => {
    try {
        const { email, password } = req.body;
        const candidate = await Candidate.findOne({ email });
        if (!candidate) return res.status(404).json({ message: "Candidate not found" });
        
        const isMatch = await bcrypt.compare(password, candidate.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        
        const token = jwt.sign({ id: candidate._id, role: candidate.role }, "hashmap", { expiresIn: "1h" });
        res.json({ token, candidate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get candidate details
export const getCandidateDetails = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id).select("-password");
        if (!candidate) return res.status(404).json({ message: "Candidate not found" });
        res.json(candidate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Update candidate details
export const updateCandidate = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const updates = req.body;

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedCandidate = await Candidate.findByIdAndUpdate(candidateId, updates, { new: true }).select("-password");

        if (!updatedCandidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        res.status(200).json({ message: "Candidate updated successfully", updatedCandidate });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete candidate
export const deleteCandidate = async (req, res) => {
    try {
        const candidateId = req.params.id;
        const deletedCandidate = await Candidate.findByIdAndDelete(candidateId);

        if (!deletedCandidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        res.status(200).json({ message: "Candidate deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



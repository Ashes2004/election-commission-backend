import Voter from "../models/voterModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new voter
export const registerVoter = async (req, res) => {
  try {
    const {
      name,
      aadhaarNumber,
      voterId,
      town,
      constituency,
      booth,
      password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const voter = new Voter({
      name,
      aadhaarNumber,
      voterId,
      town,
      constituency,
      booth,
      password: hashedPassword,
    });
    await voter.save();
    res.status(201).json({ message: "Voter registered successfully", voter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login voter
export const loginVoter = async (req, res) => {
  try {
    const { voterId, password } = req.body;
  
    const voter = await Voter.findOne({ voterId });
    if (!voter) return res.status(404).json({ message: "Voter not found" });

    const isMatch = await bcrypt.compare(password, voter.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: voter._id, role: voter.role }, "hashmap", {
      expiresIn: "1h",
    });
    res.json({ token, voter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get voter details
export const getVoterDetails = async (req, res) => {
  try {
    const voter = await Voter.findById(req.params.id).select("-password");
    if (!voter) return res.status(404).json({ message: "Voter not found" });
    res.json(voter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all voter details
export const getAllVoterDetails = async (req, res) => {
  try {
    const voter = await Voter.find().select("-password");
    if (!voter) return res.status(404).json({ message: "Voter not found" });
    res.json(voter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVoterDetails = async (req, res) => {
  try {
    const voterId = req.params.id;
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    const voter = await Voter.findByIdAndUpdate(voterId, updates, {
      new: true,
    });

    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    res
      .status(200)
      .json({ message: "Voter details updated successfully", voter });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating voter details", error: error.message });
  }
};

export const deleteVoter = async (req, res) => {
  try {
    const voterId = req.params.id;
    const voter = await Voter.findByIdAndDelete(voterId);

    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    res.status(200).json({ message: "Voter deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting voter", error: error.message });
  }
};

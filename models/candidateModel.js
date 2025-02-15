import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    aadharNo:{ type: String, required: true, unique: true },
    party: { type: String, required: true }, // Example: BJP, Congress
    constituency: { type: String, required: true }, // Example: Kolkata South
    symbol: { type: String, required: true }, // Election symbol (image URL or text)
    totalVotes: { type: Number, default: 0 }, // Stores votes received
    password: { type: String, required: true },
    role: { type: String, default: "candidate" }
}, { timestamps: true });

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;

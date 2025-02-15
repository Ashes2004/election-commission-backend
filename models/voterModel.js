import mongoose from "mongoose";

const voterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    aadhaarNumber: { type: String, required: true, unique: true },
    voterId: { type: String, required: true, unique: true },//voter card Id
    town: { type: String, required: true },//Kolkata
    constituency: { type: String, required: true },//Example: Kolkata south
    booth: { type: String, required: true }, // Example: "KS101" for Kolkata South Booth 101
    hasVoted: { type: Boolean, default: false },
    password: { type: String, required: true },
    role: { type: String, default: "voter" }
}, { timestamps: true });

const Voter = mongoose.model("Voter", voterSchema);
export default Voter;

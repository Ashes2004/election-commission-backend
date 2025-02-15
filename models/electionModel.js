import mongoose from "mongoose";

const electionSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Example: "Lok Sabha 2024"
    constituency: { type: String, required: true },
    candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Candidate" }],
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: false } // True if election is ongoing
}, { timestamps: true });

const Election = mongoose.model("Election", electionSchema);
export default Election;

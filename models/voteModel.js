import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    voter: { type: mongoose.Schema.Types.ObjectId, ref: "Voter", required: true },
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: "Candidate", required: true },
    election: { type: mongoose.Schema.Types.ObjectId, ref: "Election", required: true },
    timestamp: { type: Date, default: Date.now }
});

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;

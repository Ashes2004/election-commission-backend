import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    profilePhoto: { type: String, required: true },
    aadharNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    role: { type: String, default: "Admin" }
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;

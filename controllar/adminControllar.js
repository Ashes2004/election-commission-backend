import Admin from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



// Register a new admin
export const registerAdmin = async (req, res) => {
    try {
        const { name, profilePhoto, aadharNumber, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ name, profilePhoto, aadharNumber, email, password: hashedPassword });
        await admin.save();
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Login admin
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: "Admin not found" });
        
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        
        const token = jwt.sign({ id: admin._id, role: admin.role }, "hashmap", { expiresIn: "1h" });
        res.json({ token, admin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get admin details
export const getAdminDetails = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id).select("-password");
        if (!admin) return res.status(404).json({ message: "Admin not found" });
        res.json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Get all admins
export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().select("-password");
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update admin details
export const updateAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        const updates = req.body;

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updates, { new: true }).select("-password");

        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ message: "Admin updated successfully", updatedAdmin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete admin
export const deleteAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        const deletedAdmin = await Admin.findByIdAndDelete(adminId);

        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
        
        const token = jwt.sign({ id: admin._id, role: admin.role }, "secretKey", { expiresIn: "1h" });
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


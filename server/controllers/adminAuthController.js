import adminGenerateToken from "../config/adminGenerateToken.js";
import Admin from "../models/Admin.js";
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Admin login request received:", {email,password});
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const admin = await Admin.findOne({ email });
        console.log("Admin found:", admin);
        if (!admin) {
            return res.status(400).json({ error: "No admin found" });
        }
        if (password !== admin.password) {
            return res.status(400).json({ message: "Wrong Password" });
        }
        const token = adminGenerateToken(admin);
        res.cookie('token', token).status(200).json({
            message: "Login successful",
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "error in admin login", details: err.message });
    }
}

export const adminLogout = async (req, res) => {
    try {
        res.cookie('token' ,"").json({ message: "Logged out" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "error in admin logout", details: err.message });
    }
}
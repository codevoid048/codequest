import adminGenerateToken from "../config/adminGenerateToken.js";
import Admin from "../models/Admin.js";
import auditService from "../services/auditService.js";

export const adminLogin = async (req, res) => {
    const audit = auditService.startTrace('admin_login', {
        requestId: req.auditContext?.requestId,
        ip: req.ip,
        userAgent: req.get('User-Agent')
    });

    try {
        const { email, password } = req.body;

        auditService.security('admin_login_attempt', {
            requestId: req.auditContext?.requestId,
            email,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });

        if (!email || !password) {
            auditService.security('admin_login_failed', {
                requestId: req.auditContext?.requestId,
                email,
                reason: 'missing_credentials',
                ip: req.ip
            });
            return res.status(400).json({ message: "All fields are required" });
        }

        const admin = await Admin.findOne({ email });

        if (!admin) {
            auditService.security('admin_login_failed', {
                requestId: req.auditContext?.requestId,
                email,
                reason: 'admin_not_found',
                ip: req.ip
            });
            return res.status(400).json({ error: "No admin found" });
        }

        if (password !== admin.password) {
            auditService.security('admin_login_failed', {
                requestId: req.auditContext?.requestId,
                email,
                adminId: admin._id.toString(),
                reason: 'wrong_password',
                ip: req.ip
            });
            return res.status(400).json({ message: "Wrong Password" });
        }

        const token = await adminGenerateToken(admin);

        auditService.security('admin_login_successful', {
            requestId: req.auditContext?.requestId,
            adminId: admin._id.toString(),
            email: admin.email,
            ip: req.ip
        });

        audit.complete({
            adminId: admin._id.toString(),
            email: admin.email,
            success: true
        });

        res.cookie('Admintoken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 days
        }).status(200).json({
            message: "Login successful",
            token
        });
    } catch (err) {
        auditService.error('Admin login error', err, {
            requestId: req.auditContext?.requestId,
            email: req.body.email,
            ip: req.ip
        });

        audit.error(err);
        res.status(500).json({ error: "error in admin login", details: err.message });
    }
}

export const adminLogout = async (req, res) => {
    try {
        auditService.security('admin_logout', {
            requestId: req.auditContext?.requestId,
            adminId: req.user?._id?.toString(),
            ip: req.ip
        });

        res.cookie('Admintoken', "").json({ message: "Logged out" });
    } catch (err) {
        auditService.error('Admin logout error', err, {
            requestId: req.auditContext?.requestId,
            adminId: req.user?._id?.toString(),
            ip: req.ip
        });
        res.status(500).json({ error: "error in admin logout", details: err.message });
    }
}
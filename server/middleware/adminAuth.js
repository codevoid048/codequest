import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";


export const protectAdmin = async (req, res, next) => {
    let AdminToken;

    try {

        AdminToken = req.cookies.Admintoken;

        if (!AdminToken) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(AdminToken, process.env.JWT_SECRET);
        req.user = await Admin.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }

        next(); 
    }
    catch (error) {
        return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

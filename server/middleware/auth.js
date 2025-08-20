import jwt from "jsonwebtoken";
import { User } from "../models/User.js";


export const protect = async (req, res, next) => {
    let token;

    try {

        token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded token:", decoded.id);

        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }

        next();
    }
    catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import passport from "../config/passport.js";

export const protect = async (req, res, next) => {
    let token;

    try {

        token = req.cookies.jwt;

        // console.log("Token from cookies:", token);

        if(!token) {
            token = req.headers.authorization?.split(" ")[1];
            // if(token) console.log("Token from headers:", token);
        }

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded token:", decoded.id);

        req.user = await User.findById(decoded.id).select('-password -gfg -codechef -otp -otpExpires -createdAt -updatedAt -resetPasswordToken -resetPasswordExpires -googleId -githubId'); // Exclude sensitive fields

        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }

        req.token = token;

        next();
    }
    catch (error) {
        // console.error("JWT Verification Error:", error);
        return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
};

// OAuth callback middlewares
export const handleGoogleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Google auth error:", err);
      return res.redirect(`${process.env.CLIENT_URL}/register?error=auth_error&message=Authentication error. Please try again.`);
    }
    
    if (!user) {
      const message = info?.message || "No account found with this Google email. Please register first.";
      return res.redirect(`${process.env.CLIENT_URL}/register?error=no_account&message=${encodeURIComponent(message)}`);
    }
    
    req.user = user;
    next();
  })(req, res, next);
};

export const handleGithubCallback = (req, res, next) => {
  passport.authenticate("github", { session: false }, (err, user, info) => {
    if (err) {
      console.error("GitHub auth error:", err);
      return res.redirect(`${process.env.CLIENT_URL}/register?error=auth_error&message=Authentication error. Please try again.`);
    }
    
    if (!user) {
      const message = info?.message || "No account found with this GitHub email. Please register first.";
      return res.redirect(`${process.env.CLIENT_URL}/register?error=no_account&message=${encodeURIComponent(message)}`);
    }
    
    req.user = user;
    next();
  })(req, res, next);
};

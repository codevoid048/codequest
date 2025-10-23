import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from "node-fetch";
import bcrypt from "bcryptjs";
dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if(!profile.emails || profile.emails.length === 0) {
            return done(null, false, { message: "Google account has no email associated." });
        }

        let user = await User.findOne({ email: profile.emails[0].value });
        const email = profile.emails[0].value;
        const username = email.split("@")[0];

        if(user){
          if(!user.googleId){
            user.googleId = profile.id;
            user.isVerified = true;
            user.otp = null;
            user.otpExpires = null;
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            if(!user.username) user.username = username;
            await user.save();
          }
          const token = generateToken(user);
          return done(null, { user, token });
        }
        else{
          // User doesn't exist - redirect to register page
          return done(null, false, { message: "No account found with this Google email. Please register first." });
        }
      } catch (error) {
        //console.error("Google Auth Error:", error);
        return done(error, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.OAUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/github/callback`,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log("GitHub profile:", profile);
        let email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined;

        if(!email){
          const emailRes = await fetch("https://api.github.com/user/emails", {
            headers: { Authorization: `token ${accessToken}` },
          });
          const emails = await emailRes.json();
          const primaryEmail = emails.find(e => e.primary)?.email;
          email = primaryEmail || undefined;
        }

        if(!email){
          throw new Error("GitHub account has no email associated.");
        }

        const username = email ? email.split("@")[0] : profile.username;
        let user = await User.findOne({ email });

        if(user){
            user.githubId = profile.id;
            user.isVerified = true;
            user.otp = null;
            user.otpExpires = null;
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            if (!user.username) user.username = username;
            await user.save();
            
            const token = generateToken(user);
            return done(null, { user, token });
        }
        else {
          // User doesn't exist - redirect to register page
          return done(null, false, { message: "No account found with this GitHub email. Please register first." });
        }
      } catch (error) {
        // console.error("GitHub Strategy error:", error);
        return done(error, null);
      }
    }
  )
);


export default passport;
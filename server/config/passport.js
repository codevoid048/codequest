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
        if(user){
          if(!user.googleId){
            user.googleId = profile.id;
            user.isVerified = true;
            await user.save();
          }
          const token = generateToken(user);  
          return done(null, { user, token });
        } 
        else{
          const dummyPassword = Math.random().toString(36).slice(-8); 
          const hashedPassword = await bcrypt.hash(dummyPassword, 10);
          const newUser = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: hashedPassword,
            googleId: profile.id,
            isVerified: true,
          });
          const token = generateToken(newUser);
        return done(null, { user:newUser, token });
        }
      } catch (error) {
        console.error("Google Auth Error:", error);
        return done(error, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/api/auth/github/callback`,
      scope: ["user:email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("GitHub profile:", profile);
        const email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined;

        let user;
        if(email){
          user = await User.findOne({ email });
          if(user && !user.githubId){
            user.githubId = profile.id;
            user.isVerified = true;
            await user.save();
          }
        }
        else {
          const emailRes = await fetch("https://api.github.com/user/emails", {
            headers: { Authorization: `token ${accessToken}` },
          });
          const emails = await emailRes.json();
          const primaryEmail = emails.find(e => e.primary)?.email;
          email = primaryEmail || undefined;
        }

        if(!user){ user = await User.findOne({ githubId: profile.id });}

        if(!user){
          const dummyPassword = Math.random().toString(36).slice(-8); 
          const hashedPassword = await bcrypt.hash(dummyPassword, 10);
          user = await User.create({
            name: profile.displayName || profile.username,
            email: email || undefined,
            password: hashedPassword,
            githubId: profile.id,
            isVerified: true,
          });
        }

        const token = generateToken(user);
        return done(null, { user, token });
      } catch (error) {
        console.error("GitHub Strategy error:", error);
        return done(error, null);
      }
    }
  )
);


export default passport;

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

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
        console.log("Google profile:", profile);
        let user = await User.findOne({ googleId: profile.id });
        if(!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            isVerified: true, 
          });
        }
        done(null, user);
      } catch (error) {
        console.error("Strategy error:", error);
        done(error, null);
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
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Github profile:", profile);
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          user = await User.create({
            name: profile.displayName || profile.username,
            email: profile.emails ? profile.emails[0].value : undefined,
            githubId: profile.id,
            isVerified: true,
          });
        }
        done(null, user);
      } catch (error) {
        console.error("Github Strategy error:", error);
        done(error, null);
      }
    }
  )
);

export default passport;

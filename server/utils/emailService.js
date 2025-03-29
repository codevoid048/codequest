import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
  try {
      //console.log("Sending email to:", email);  // Debugging log
      //console.log("Verification token:", token);  // Debugging log
      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.EMAIL_USER,  
              pass: process.env.EMAIL_PASS, 
          },
      });
      const verificationLink = `${process.env.BASE_URL}/api/auth/verify/${token}`;
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Verify Your Email",
          html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${email}`);
  } catch (error) {
      console.error("Error sending email:", error);
  }
};
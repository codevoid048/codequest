import jwt from "jsonwebtoken";

const adminGenerateToken = async (admin) => {
    return jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

export default adminGenerateToken;

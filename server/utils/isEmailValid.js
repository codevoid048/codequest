import emailValidator from "deep-email-validator";

export const isEmailValid = async (email) => {
    try {
        const result = await emailValidator.validate(email);
       // console.log("Email Validation Result:", result); // Debugging log
        return result;
    } catch (error) {
        console.error("Email Validation Error:", error);
        return { valid: false, reason: "validation_error" };
    }
};

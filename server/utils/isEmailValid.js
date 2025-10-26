// import emailValidator from "deep-email-validator";
import emailValidator from "node-email-verifier";
import auditService from "../services/auditService.js";

// export const isEmailValid = async (email) => {
//     try {
//         const result = await emailValidator.validate(email);
//        // console.log("Email Validation Result:", result); // Debugging log
//         return result;
//     } catch (error) {
//         console.error("Email Validation Error:", error);
//         return { valid: false, reason: "validation_error" };
//     }
// };

export const isEmailValid = async (email) => {
  const audit = auditService.startTrace('email_validation', { email });
  
  try {
    const result = await emailValidator(email, { detailed: true, checkDisposable: true });
    
    auditService.systemEvent('email_validated', {
      email,
      valid: result.valid,
      reason: result.reason
    });

    audit.complete({ valid: result.valid, reason: result.reason });
    return result;
  } catch (error) {
    auditService.error('Email validation failed', error, {
      email,
      service: 'node-email-verifier'
    });
    
    audit.error(error);
    return { valid: false, reason: 'validation_error' };
  }
};
import validator from "validator";

const forgotPasswordFormValidation = (Email) => {
    return validator.isEmail(Email);
};

export default forgotPasswordFormValidation;
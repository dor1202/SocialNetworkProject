import validator from "validator";

const resetPasswordFormValidation = (Password, PasswordVerify) => {
    return validator.isAlphanumeric(Password) &&
    Password === PasswordVerify;
};

export default resetPasswordFormValidation;
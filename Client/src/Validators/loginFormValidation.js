import validator from "validator";

const loginFormValidation = (Email, Password) => {
    return validator.isEmail(Email) &&
    validator.isAlphanumeric(Password);
};

export default loginFormValidation;
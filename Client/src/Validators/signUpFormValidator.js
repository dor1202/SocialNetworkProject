import validator from "validator";

const signUpFormValidator = (UserName, Password, PasswordAgain, Email, FirstName, LastName, Address, fullPhoneNumber) => {
    return validator.isAlphanumeric(UserName) &&
    validator.isAlphanumeric(Password) &&
    Password === PasswordAgain &&
    validator.isEmail(Email) &&
    validator.isAlphanumeric(FirstName) &&
    validator.isAlphanumeric(LastName) &&
    validator.isAlphanumeric(Address) &&
    validator.isMobilePhone(fullPhoneNumber);
};

export default signUpFormValidator;
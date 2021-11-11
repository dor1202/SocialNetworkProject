
import forgotPasswordFormValidation from "Validators/forgotPasswordFormValidation";
import resetPasswordFormValidation from "Validators/resetPasswordFormValidation";
import filterFormValidation from "Validators/filterFormValidation";
import loginFormValidation from "Validators/loginFormValidation";
import signUpFormValidator from "Validators/signUpFormValidator";
import addGroupValidation from "Validators/addGroupValidation";
import postFormValidation from "Validators/postFormValidation";

class ValidationService {
    static signUpFormValidator = (UserName, Password, PasswordAgain, Email, FirstName, LastName, Address, fullPhoneNumber) => signUpFormValidator(UserName, Password, PasswordAgain, Email, FirstName, LastName, Address, fullPhoneNumber);
    static filterFormValidation = (Publisher, Radius, ImgTags, TaggedUsers) => filterFormValidation(Publisher, Radius, ImgTags, TaggedUsers);
    static resetPasswordFormValidation = (Password, PasswordVerify) => resetPasswordFormValidation(Password, PasswordVerify);
    static postFormValidation = (Description, Title, ImgFile) => postFormValidation(Description, Title, ImgFile);
    static loginFormValidation = (Email, Password) => loginFormValidation(Email, Password);
    static forgotPasswordFormValidation = (Email) => forgotPasswordFormValidation(Email);
    static addGroupValidation = (GroupName) => addGroupValidation(GroupName);
}

export default ValidationService;
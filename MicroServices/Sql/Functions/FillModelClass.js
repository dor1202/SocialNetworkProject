const userModel = require('@models/userModel');

class FillModelClass {
    static fillUserModel(id,UserName,firstName,lastName,email){
        let userTemplate = userModel;
        userTemplate.Id = id;
        userTemplate.UserName = UserName;
        userTemplate.FirstName = firstName;
        userTemplate.LastName = lastName;
        userTemplate.Email = email;
        return userTemplate;
    }
}

module.exports = FillModelClass;
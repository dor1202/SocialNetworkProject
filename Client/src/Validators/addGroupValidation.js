import validator from "validator";

const addGroupValidation = (GroupName) => {
    return !validator.isEmpty(GroupName);
};

export default addGroupValidation;
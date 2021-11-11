import validator from "validator";

const filterFormValidation = (Publisher, Radius, ImgTags, TaggedUsers) => {
    return (Publisher !== '' && validator.isAlphanumeric(Publisher)) ||
    (Radius !== '' && validator.isDecimal(Radius)) ||
    (ImgTags !== '' && validator.isAlphanumeric(ImgTags)) ||
    (TaggedUsers !== '' && validator.isAlphanumeric(TaggedUsers));
};

export default filterFormValidation;
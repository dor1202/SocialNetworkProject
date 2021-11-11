const fillPopup = (setPopupHeader, setCurrentPopupForm, setOpenBeforeTestPop, popupHeader, template) => {
    setPopupHeader(popupHeader);
    setCurrentPopupForm(template);
    setOpenBeforeTestPop(true);
};

export default fillPopup;
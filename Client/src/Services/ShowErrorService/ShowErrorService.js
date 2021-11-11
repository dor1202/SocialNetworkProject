const showError = (setShowError) => {
    setShowError(true);
    setTimeout(() => setShowError(false), 2000);
};

export default showError;
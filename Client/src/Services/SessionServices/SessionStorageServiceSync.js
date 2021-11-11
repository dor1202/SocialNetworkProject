
const addToSessionStorage = (key, value) => sessionStorage.setItem(key, value);

const removeFromSessionStorage = (key) => sessionStorage.removeItem(key);

const getFromSessionStorage = (key) => sessionStorage.getItem(key);

const clearSessionStorage = () => sessionStorage.clear();

const SessionStorageServiceSync = {
    removeFromSessionStorage,
    getFromSessionStorage,
    addToSessionStorage,
    clearSessionStorage
};

export default SessionStorageServiceSync;
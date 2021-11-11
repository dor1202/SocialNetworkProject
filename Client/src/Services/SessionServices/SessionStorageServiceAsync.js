
const SessionStorageRemove = async (key) => await sessionStorage.removeItem(key);

const SessionStorageGet = async (key) => await sessionStorage.getItem(key);

const SessionStorageClear = async () => await sessionStorage.clear();

const SessionStorageAdd = async (key, value) => await sessionStorage.setItem(key, value);


const SessionStorageServiceAsync = {
    SessionStorageRemove,
    SessionStorageGet,
    SessionStorageClear,
    SessionStorageAdd
};

export default SessionStorageServiceAsync;

import axios from "axios";

const axiosCreate = axios.create({ baseURL: process.env.REACT_APP_serverUrl });

axiosCreate.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (!expectedError) console.log("Logging the error", error);

  return Promise.reject(error);
});

const methods = {
  get: axiosCreate.get,
  post: axiosCreate.post,
  put: axiosCreate.put,
  delete: axiosCreate.delete,
};

export default methods;

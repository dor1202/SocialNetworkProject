
import http from "Services/HttpService/httpService";

const adminProxyService = {
  async checkIfUserIsValid(userData) {
    const jsonBody = { user: userData };
    return await http.post("Users/isValid", jsonBody);
  },
};

export default adminProxyService;

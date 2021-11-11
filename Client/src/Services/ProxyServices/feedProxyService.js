
import SessionStorageService from "Services/SessionServices/SessionStorageServiceSync";
import http from "Services/HttpService/httpService";

const feedProxyService = {
  async getFeed(center) {
    const jsonBody = {center};
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.post("Feed/getFeed", jsonBody,
      { headers: { 'authorization': userSession } });
  },
  async getFeedByParameter(filterData, center) {
    const jsonBody = {filterData, center};
    const userSession = SessionStorageService.getFromSessionStorage('User');
    return await http.post("Feed/getFeedByParameter", jsonBody,
      { headers: { 'authorization': userSession } });
  },
};

export default feedProxyService;

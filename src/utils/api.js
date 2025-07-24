import axios from "axios";

// 현재는 로그인 기능이 없으므로, 임시 토큰 생성하여 헤더에 부착
const DEV_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODgyMzY5MmY2OGQ2ZjQxMmRkMTMwZWUiLCJpYXQiOjE3NTMzNzU3MTEsImV4cCI6MTc4NDkxMTcxMX0.ApepOl_beh9gEj5TL0v_um93fpdB_XtdCG8-89eGuLw";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${DEV_JWT}`,
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;

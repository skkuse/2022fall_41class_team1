import axios from "axios";

axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
axios.withCredentials = true;

export const baseURL =  "http://localhost:8000";


export const request = (method, url, data) => {
  return axios(
    {
      method: method,
      url: url,
      data: data,
    },
    { "Content-Type": "application/json", withCredentials: true }
  )
    .then((res) => {
      console.log("axios.js: " + res);
      return res;
    })
    .catch((err) => console.log(err));
};

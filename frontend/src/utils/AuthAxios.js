import axios from "axios";
import { getCookie } from "../cookie";

export const isLoggedIn = () => {
  const refreshToken = getCookie('refresh_token'); // 만약 이 토큰이 없을 때 undefined 를 반환한다고 침
  return refreshToken != undefined;
}

export const auth_axios = (method, url, data) => {
  const accessToken = localStorage.getItem('access_token');
  return axios(
    {
      method: method,
      url: url,
      data: data,
    },
    { "Content-Type": "application/json", withCredentials: true, "Authorization": `Bearer ${accessToken}` }
  )
    .then((res) => {
      if (res.payload.status == 200) {
        return res;
      } else {
        // 
        

        // 리프레시 토큰이 애초에 없는 경우
        if (!isLoggedIn()) {
          // 로그아웃시키고 함수 나가기
        } else { // 리프레시 토큰을 가지고 있지만 액세스 토큰이 만료된 경우
          // 리프레시 토큰을 가지고 액세스 토큰 재발급 요청
          axios.get('/api/auth/reissue', {
            headers: `Authorization: Bearer ${accessToken}`
          })
          .then((res) => {
            // 액세스 토큰 발급에 성공했는지 확인
            // 발급에 실패했다면 로그아웃 후 함수 종료
            // 성공했다면 새로 발급한 액세스 토큰을 이용해 아까 401 에러가 나온 요청을 다시 요청
          })
        }
      }
      console.log("axios.js: " + res);
      return res;
    })
    .catch((err) => console.log(err));
};
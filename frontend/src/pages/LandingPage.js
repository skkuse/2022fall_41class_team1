import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../_actions/userAction";

function LandingPage(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const onClickHandler = () => {
      dispatch(logoutUser())
        .then((res) => {
          console.log(res);
          if (res.payload.success) {
            navigate("/login");
          } else {
            alert("로그아웃에 실패하였습니다");
          }
        })
        .catch((err) => console.log(err));
  };
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>
      <button onClick={() => navigate("/register")}>회원가입</button>
      <button onClick={() => navigate("/login")}>로그인</button>
      <button onClick={onClickHandler}>로그아웃</button>
      <button onClick={() => navigate("/verify")}>인증확인</button>
    </div>
  );
}

export default LandingPage;

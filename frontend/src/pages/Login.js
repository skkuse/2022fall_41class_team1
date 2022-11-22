import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const onDesktop2Click = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="desktop2" onClick={onDesktop2Click}>
      <div className="groupDiv">
        <div className="iDDiv">ID</div>
        <div className="pWDiv">PW</div>
        <div className="component1Div">
          <div className="rectangleDiv" />
        </div>
        <div className="component2Div">
          <div className="rectangleDiv" />
        </div>
      </div>
      <div className="component3Div">
        <div className="rectangleDiv2" />
      </div>
      <div className="codingTestDiv_login">
        <div className="codingTestDiv1_login">coding test...</div>
      </div>
      <div className="div">로그인</div>
      <div className="div1">
        <div className="iDPW">ID / PW 찾기</div>
        <div className="register">회원가입</div>
      </div>
    </div>
  );
};

export default Login;

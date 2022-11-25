import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const onLogin1Click = useCallback(() => {
    navigate("/main");
  }, [navigate]);

  return (
    <div className="desktop2">
      <div className="login_title1">CODING TEST</div>
      <div className="login_title2">CODING TEST</div>
      <div className="login_input">
        <div className="email_text">E-mail</div>
        <input className="email_input"></input>
        <div className="pw_text">PW</div>
        <input className="pw_input"></input>
      </div>
      <button className="loginBtn" onClick={onLogin1Click}>로그인</button>
      <div className="link_findPw"><Link to="/find">PW 찾기</Link></div>
      <div className="link_register"><Link to="/register">회원가입</Link></div>
    </div>
  );
};

export default Login;

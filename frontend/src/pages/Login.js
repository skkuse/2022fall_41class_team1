import React, { useCallback,useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();
  const [logAccount, setLogAccount] = useState({
    user_email: "",
    user_password: "",
  });

  const onChangeLogAccount = (e) => {
    setLogAccount({
      ...logAccount,
      [e.target.name]: e.target.value,
    });
    console.log(logAccount);
  };

  const onLogin1Click = useCallback(() => {
    navigate("/main");
  }, [navigate]);

  const getLoginInf = async() =>{
       const newData = {
        user_id: logAccount.user_email,
        user_pwd: logAccount.user_password,
     };
     try {
        const response = await axios.post(
        "http://localhost:8000/main/signin/",
        newData
     );
     console.log("response >>", response);
     console.log(response["data"]["msg"]);
     if(response["data"]["msg"]=="login sucess"){
        onLogin1Click();
     }
     else{
        alert("잘못된 아이디나 비밀번호 입니다.");
     }
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <div className="desktop2">
      <div className="login_title1">CODING TEST</div>
      <div className="login_title2">CODING TEST</div>
      <div className="login_input">
        <div className="email_text">E-mail</div>
        <input name="user_email" className="email_input"></input>
        <div className="pw_text">PW</div>
        <input name="user_password" className="pw_input"></input>
      </div>
      <button className="loginBtn" onClick={getLoginInf}>로그인</button>
      <div className="link_findPw"><Link to="/find">PW 찾기</Link></div>
      <div className="link_register"><Link to="/register">회원가입</Link></div>
    </div>
  );
};

export default Login;

import React, { useCallback,useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {baseURL} from '../utils/axios';
import Logo from "../assets/Logo.png";

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

  const validateEmail = email => {
    const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
    return regex.test(email);
  };
  const removeWhitespace = text => {
    const regex = /\s/g;
    return text.replace(regex, '');
  };

  //const _handleEmailChange = (e) => {
    //const changeEmail = removeWhitespace(email);
    //setEmail(e.target.email);
  //}
  //const _handlePasswordChange = (e) => {
    //setPassword(e.target.password);
  //}
  //const onRegisterClick = (e) => {
    //navigate("/register");
  //}

  const onLogin1Click = useCallback((logAccount) => {
  console.log(logAccount);
    navigate("/main",{state: logAccount});
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
     if(response["data"]["msg"]=="Login Sucess"){
        console.log(logAccount);
        onLogin1Click(logAccount);
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
      <img src={Logo} alt="codingtest" className="logo"></img>
      <div className="login_container">
        <div className="login_input">
          <div className="login_subsection">
            <div className="text_container">
              <div className="email_text">이메일</div>
              <div className="pw_text">비밀번호</div>
            </div>
            <div className="input_container">
              <input type='text' name="user_email" className="email_input" onChange={onChangeLogAccount}></input>
              <input  name="user_password" className="pw_input" onChange={onChangeLogAccount}></input>
            </div>
            <button className="loginBtn" onClick={getLoginInf}>로그인</button>
          </div>
            <div className="otherbutton">
              <div className="link_register"><Link to="/register">회원가입</Link></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

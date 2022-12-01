import { useCallback, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import {baseURL} from '../utils/axios';
import Logo from "../assets/Logo.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword]= useState('');
  const navigate = useNavigate();

  const validateEmail = email => {
    const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
    return regex.test(email);
  };

  const removeWhitespace = text => {
    const regex = /\s/g;
    return text.replace(regex, '');
  };

  const _handleEmailChange = (e) => {
    const changeEmail = removeWhitespace(email);
    setEmail(e.target.email);
  }
  const _handlePasswordChange = (e) => {
    setPassword(e.target.password);
  }
  const onRegisterClick = (e) => {
    navigate("/register");
  }

  const onLoginClick = async (e) => {
    try {
      const response = await axios.post(`${baseURL}/main/signin/`, {
          email: email,
          password: password,
      });
      console.log('response : ', response);
      if(response.data.success == true){
        navigate("/main");
      }
    } catch (error) {
        if (error.response) {
            const errorResponse = error.response;
            console.log('data : ', errorResponse.data);
            console.log('status : ', errorResponse.status);
            console.log('headers : ', errorResponse.headers);
        } else if (error.request) {
            console.log('request : ', error.request);
        } else {
            console.log('meassage : ', error.message);
        }
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
            <input 
              type='text'
              value={email}
              className="email_input"
              onChange={_handleEmailChange}
            />
            <input
              value={password}
              className="pw_input"
              onChange={_handlePasswordChange}
            />
          </div>
          <button className="loginBtn" onClick={onLoginClick}>로그인</button>
        </div>
        <div className="otherbutton">
          <div className="link_register" onClick={onRegisterClick}>회원가입</div>
        </div>
      </div> 
    </div>
    </div>
  );
};

export default Login;

import React, { useCallback,useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo.png";

const Register = () => {

  const navigate = useNavigate();
  const [account, setAccount] = useState({
    user_email: "",
    user_name: "",
    user_password: "",
    user_passwordcheck:"",
    find_email:"",
    find_answer:""
  });

  const onChangeAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
    console.log(account);
  };

  const sendData=async()=>{
     const newData = {
        user_id: account.user_email,
        user_name: account.user_name,
        user_pwd: account.user_password,
        user_type: "True",
        user_org: "skku"
     };
     try {
        const response = await axios.post(
        "http://localhost:8000/main/signup/",
        newData
     );
     console.log("response >>", response);
    } catch (err) {
      console.log("Error >>", err);
    }
  };


  const onRegisterClick = useCallback(() => {
    sendData();
    navigate("/login");
  }, [navigate]);


  return (
    <div className="desktop3">
      <img src={Logo} alt="codingtest" className="logo"></img>
      <div className="container">
      <div className="register_input">
        <div className="register_subcontainer">
          <div className="text_containerbox">
            <div className="emailText">이메일</div>
            <input name="user_email" className="emailInput" onChange={onChangeAccount}></input>
          </div>
          <div className="text_containerbox">
            <div className="nameText">이름</div>
            <input name="user_name" className="nameInput" onChange={onChangeAccount}></input>
          </div>
          <div className="text_containerbox">
            <div className="pwText">비밀번호</div>
            <input name="user_password" className="pwInput" onChange={onChangeAccount}></input>
          </div>
          <div className="text_containerbox">
            <div className="checkText">확인</div>
            <input name="user_passwordcheck" className="pwcheckInput" onChange={onChangeAccount}></input>
            </div>
          </div>
         </div>
        <button className="registerBtn" onClick={account.user_password==account.user_passwordcheck?onRegisterClick:()=>{console.err("Password check is not same with password")}}>회원가입</button>
      </div>
      </div>
  );
};

export default Register;

import React, { useCallback,useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";

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
      <div className="title_box">
        <div className="register_title1">CODING TEST</div>
        <div className="register_title2">CODING TEST</div>
      </div>
      <div className="register_input">
        <div className="register_subcontainer">
          <div className="text_containerbox">
            <div className="emailText">E-mail</div>
            <div className="nameText">Name</div>
            <div className="pwText">PW</div>
            <div className="checkText">PW 확인</div>
            <div className="findText">PW 찾기 질문</div>
            <div className="answerText">답변</div>
          </div>
          <div className="input_containerbox">
            <input name="user_email" className="emailInput" onChange={onChangeAccount}></input>
            <input name="user_name" className="nameInput" onChange={onChangeAccount}></input>
            <input name="user_password" className="pwInput" onChange={onChangeAccount}></input>
            <input name="user_passwordcheck" className="checkInput" onChange={onChangeAccount}></input>
            <select name="find_email" className="findInput" reuqired>
              <option value="hungry">아 배고프다</option>
              <option>저녁을 먹어야 할 시간이네요</option>
              <option>다들 데이트 중인가요? *윤진</option>
              <option>행복하세요</option>
            </select>
            <input name="find_answer"className="answerInput"></input>
          </div>
        </div>
        <button className="registerBtn" onClick={account.user_password==account.user_passwordcheck?onRegisterClick:()=>{console.err("Password check is not same with password")}}>회원가입</button>
      </div>
    </div>
  );
};

export default Register;

import React, { useCallback,useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from 'react-select';

const Register = () => {

  const navigate = useNavigate();
  const [account, setAccount] = useState({
    user_email: "",
    user_name: "",
    user_password: "",
    user_passwordcheck:"",
  });

  const [user_class, setUser_class] = useState("");

  const onChangeAccount = (e) => {
  console.log(e);
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
    console.log(account);
  };

  const onClassChangeAccount = (e) => {
  console.log(e);
    setUser_class(e.value);
    console.log(account);
  };

  const sendData=async()=>{
  console.log(account);
     const newData = {
        user_id: account.user_email,
        user_name: account.user_name,
        user_pwd: account.user_password,
        user_type: user_class,
        user_org: "skku"
     };
     try {
        const response = await axios.post(
        "http://localhost:8000/main/signup/",
        newData
     );
     console.log("response >>", response);
     console.log(response["statusText"])
     if(response["statusText"]=="OK"){
        onRegisterClick();
     }
     else{
        alert("Please fill the blanks. If you have, then there exists such e-mail.");
     }

    } catch (err) {
      console.log("Error >>", err);
    }
  };


  const onRegisterClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

    const ops = [
	{ value: "True", label: "학생" },
	{ value: "False", label: "교수자" },
	];



  return (
    <div className="desktop3">
      <div className="register_title1">CODING TEST</div>
      <div className="register_title2">CODING TEST</div>
      <div className="register_input">
        <div className="emailText">E-mail</div>
        <input name="user_email" className="emailInput" onChange={onChangeAccount}></input>
        <div className="nameText">Name</div>
        <input name="user_name" className="nameInput" onChange={onChangeAccount}></input>
        <div className="pwText">PW</div>
        <input name="user_password" className="pwInput" onChange={onChangeAccount}></input>
        <div className="checkText">PW 확인</div>
        <input name="user_passwordcheck" className="checkInput" onChange={onChangeAccount}></input>
        <div className="classText">직책</div>
        <Select
                name="user_class"
                className="classInput"
            	onChange={onClassChangeAccount}
            	placeholder="직책을 선택하세요."
                options={ops}
            />
      </div>
      <button className="registerBtn" onClick={account.user_password==account.user_passwordcheck?sendData:()=>{alert("Password check is not same with password")}}>회원가입</button>
    </div>
  );
};

export default Register;

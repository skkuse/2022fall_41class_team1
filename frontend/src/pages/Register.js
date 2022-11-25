import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const onRegisterClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="desktop3">
      <div className="register_title1">CODING TEST</div>
      <div className="register_title2">CODING TEST</div>
      <div className="register_input">
        <div className="emailText">E-mail</div>
        <input className="emailInput"></input>
        <div className="pwText">PW</div>
        <input className="pwInput"></input>
        <div className="checkText">PW 확인</div>
        <input className="checkInput"></input>
        <div className="findText">PW 찾기 질문</div>
        <select className="findInput" reuqired>
          <option value="hungry">아 배고프다</option>
          <option>저녁을 먹어야 할 시간이네요</option>
          <option>다들 데이트 중인가요? *윤진</option>
          <option>행복하세요</option>
        </select>
        <div className="answerText">답변</div>
        <input className="answerInput"></input>
      </div>
      <button className="registerBtn" onClick={onRegisterClick}>회원가입</button>
    </div>
  );
};

export default Register;

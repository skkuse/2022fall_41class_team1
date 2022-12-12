import { useCallback, useState} from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SubjectPage.css";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";


const SubjectPage = () => {
 
  return (
    <div className="desktop5">
      <img src={Logo} alt="codingtest" className="logo"></img>
      <div className="container">
        <div className="select">
          <div className="select_txt">과목</div>
          <select name="subject" className="subject_option" reuqired>
            <option value="soft">소프트웨어공학개론</option>
            <option>시스템프로그래밍실습</option>
            <option>데이터베이스개론</option>
            <option>웹프로그래밍실습</option>
          </select>
      </div>
      <button className="startBtn">시작하기</button>
      </div>
    </div>
  );
};

export default SubjectPage;

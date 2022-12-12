import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ResultPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../utils/axios";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { render } from "react-dom";
import Logo from "../assets/Logo.png";
import Play from "../assets/play.svg";

const ResultPage = () => {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);

  const handle_button1 = () => {
    setSelected1(!selected1);
    setSelected2(false);
  };

  const handle_button2 = () => {
    setSelected2(!selected2);
    setSelected1(false);
  };

  return (
    <div className="page_container">
      <div className="resultpage-wrapper">
        <div className="resultpage-left-container">
          <div className="resultpage-lhdr">
            <img src={Logo} alt="codingtest" className="logo"></img>
          </div>
          <div className="submitresult_container">
            <button className="submitresult_button" onClick={handle_button1}>
              <img src={Play} className="play"></img>
              제출 결과 (Overall Score)
            </button>
            <button
              className="submitresult_innerbutton"
              onClick={handle_button1}
            >
              ㄴ 표절 검사
            </button>
            <button
              className="submitresult_innerbutton"
              onClick={handle_button1}
            >
              ㄴ 기능 채점
            </button>
            <button
              className="submitresult_innerbutton"
              onClick={handle_button1}
            >
              ㄴ 효율 채점
            </button>
            <button
              className="submitresult_innerbutton"
              onClick={handle_button1}
            >
              ㄴ 가독성 채점
            </button>
            <button className="submitresult_button" onClick={handle_button2}>
              <img src={Play} className="play"></img>
              코드 설명, 관련 자료
            </button>
          </div>
        </div>
        <div className="resultpage-right-container">
          <div className="resultpage-rhdr "></div>
          <div className="resultpage-component">
            <div className="text_section">
              <h1>
                Result Text Area Result Text Area<br></br> Result Text Area
                Result Text Area<br></br> Result Text Area Result Text Area
                <br></br>{" "}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

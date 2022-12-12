import React, { useCallback, useState, useEffect } from "react";
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
import Chart, { drawCopy, drawFER } from "./Chart";

const ResultPage = () => {
  let [titleName, setTitleName] = useState(["제출 결과 (Overall Score)"]);
  const [overallInfo, setOverall] = useState({
    총점: null,
    표절: null,
    기능: null,
    효율: null,
    가독성: null,
  }); // 사진 + 정보 결과
  const [detailInfo, setDetail] = useState(); // 정보만 결과
  const [graphBlock, setGraphBlock] = useState(false);

  const [selected1, setSelected1] = useState(true); //제출결과
  const [selected2, setSelected2] = useState(false); //표절검사
  const [selected3, setSelected3] = useState(false); //코드분석, 관련 링크

  const navigate = useNavigate();
  const navigateToMain = () => {
    navigate(-1);
  };

  const handle_button1 = () => {
    setSelected1(true);
    setSelected2(false);
    setSelected3(false);

    setTitleName("제출 결과 (Overall Score)");
  };

  useEffect(() => {}, []);

  const handle_button2 = () => {
    setSelected1(true);
    setSelected2(false);
    setSelected3(false);
    setTitleName("가독성 채점");
    setGraphBlock(false);
  };

  const handle_button3 = () => {
    setSelected1(true);
    setSelected2(false);
    setSelected3(false);

    setTitleName("기능 채점");
    setGraphBlock(true);
  };

  const handle_button4 = () => {
    setTitleName("효율 채점");
    setGraphBlock(true);

    setSelected1(true);
    setSelected2(false);
    setSelected3(false);
  };
  const handle_button5 = () => {
    setTitleName("표절 검사");
    setGraphBlock(true);

    setSelected1(false);
    setSelected2(true);
    setSelected3(false);
  };
  const handle_button6 = () => {
    setTitleName("코드 설명, 관련 자료 채점");
    setGraphBlock(false);

    setSelected1(false);
    setSelected2(false);
    setSelected3(true);
  };

  return (
    <div className="page_container">
      <div className="resultpage-wrapper">
        <div className="resultpage-left-container">
          <div className="resultpage-lhdr">
            <img
              src={Logo}
              alt="codingtest"
              className="logo"
              onClick={navigateToMain}
            ></img>
          </div>
          <div className="submitresult_container">
            <button className="submitresult_button" onClick={handle_button1}>
              <img src={Play} className="play"></img>
              제출 결과 (Overall Score)
            </button>
            <button
              className="submitresult_innerbutton"
              onClick={handle_button2}
            >
              ㄴ 가독성 채점
            </button>
            <button
              className="submitresult_innerbutton"
              onClick={handle_button3}
            >
              ㄴ 기능 채점
            </button>
            <button
              className="submitresult_innerbutton"
              onClick={handle_button4}
            >
              ㄴ 효율 채점
            </button>
            <button className="submitresult_button" onClick={handle_button5}>
              <img src={Play} className="play"></img>
              표절 검사
            </button>
            <button className="submitresult_button" onClick={handle_button6}>
              <img src={Play} className="play"></img>
              코드 설명, 관련 자료
            </button>
          </div>
        </div>
        <div className="resultpage-right-container">
          <div className="resultpage-rhdr ">{titleName}</div>
          <div className="resultpage-component">
            <div className="text_section">
              {selected1 ? drawFER() : selected2 ? drawCopy() : <div></div>}
            </div>
          </div>
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

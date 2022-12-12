import React, { useCallback, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const { state } = useLocation();

  const navigate = useNavigate();
  const navigateToMain = () => {
    navigate(-1);
  };

  let [titleName, setTitleName] = useState(["제출 결과 (Overall Score)"]);
  const [overallInfo, setOverall] = useState({
    score: state.score,
    copy: state.copy,
    efficiencya: state.efficiencya,
    efficiencyb: state.efficiencyb,
    readability: state.readability,
  }); // 사진 + 정보 결과
  const [detailInfo, setDetail] = useState(); // 정보만 결과

  const [selected, setSelected] = useState(1); //제출결과

  const handle_button1 = () => {
    setSelected(1);

    setTitleName("제출 결과 (Overall Score)");
  };

  useEffect(() => {
    console.log(overallInfo);
  }, []);

  const handle_button2 = () => {
    setSelected(2);

    setTitleName("가독성 채점");
  };

  const handle_button3 = () => {
    setSelected(3);

    setTitleName("기능 채점");
    //setGraphBlock(true);
  };

  const handle_button4 = () => {
    setTitleName("효율 채점");
    //setGraphBlock(true);

    setSelected(4);
  };
  const handle_button5 = () => {
    setTitleName("표절 검사");
    //setGraphBlock(true);

    setSelected(5);
  };
  const handle_button6 = () => {
    setTitleName("코드 설명, 관련 자료 채점");
    //setGraphBlock(false);

    setSelected(6);
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
              {selected < 5 ? (
                drawFER()
              ) : selected < 6 ? (
                drawCopy()
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="resultpage-component">
            <div className="text_section">
              {selected == 1 ? (
                <h1>text None</h1>
              ) : selected == 2 ? (
                <h1>
                  - mypy : {overallInfo.readability.score.mypy}
                  <br></br>- pylint : {overallInfo.readability.score.pylint}
                  <br></br>- eradicate :{" "}
                  {overallInfo.readability.score.eradicate}
                  <br></br>- radon : {overallInfo.readability.score.radon}
                  <br></br>- pycodestyle :{" "}
                  {overallInfo.readability.score.pycodestyle}
                  <br></br>
                  comment <br></br>- mypy :{" "}
                  {overallInfo.readability.comment.mypy}
                  <br></br>- pylint : {overallInfo.readability.comment.pylint}
                  <br></br>- eradicate :{" "}
                  {overallInfo.readability.comment.eradicate}
                  <br></br>- radon : {overallInfo.readability.comment.radon}
                  <br></br>- pycodestyle :{" "}
                  {overallInfo.readability.comment.pycodestyle}
                  <br></br>
                </h1>
              ) : selected == 3 ? (
                <h1>
                  Result Text Area Result Text Area<br></br> Result Text Area
                  Result Text Area<br></br> Result Text Area Result Text Area
                  <br></br>
                </h1>
              ) : selected == 4 ? (
                <h1>
                  - memory efficiency : {overallInfo.efficiencya}
                  <br></br>- time efficiency : {overallInfo.efficiencyb}
                  <br></br>
                </h1>
              ) : selected == 5 ? (
                <h1>
                  Result Text Area Result Text Area<br></br> Result Text Area
                  Result Text Area<br></br> Result Text Area Result Text Area
                  <br></br>
                </h1>
              ) : (
                // if selected == 6
                <h1>
                  Result Text Area Result Text Area<br></br> Result Text Area
                  Result Text Area<br></br> Result Text Area Result Text Area
                  <br></br>
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

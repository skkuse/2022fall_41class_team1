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
          {selected1 ? (
            <div className="submitresult_innerbuttons">
              <button className="submitresult_innerbutton" onClick={() => {}}>
                ㄴ 표절률 검사
              </button>
              <button className="submitresult_innerbutton" onClick={() => {}}>
                ㄴ 기능성 채점
              </button>
              <button className="submitresult_innerbutton" onClick={() => {}}>
                ㄴ 효율성 채점
              </button>
              <button className="submitresult_innerbutton" onClick={() => {}}>
                ㄴ 가독성 채점
              </button>
            </div>
          ) : (
            <div></div>
          )}
          <button className="submitresult_button" onClick={handle_button2}>
            <img src={Play} className="play"></img>
            코드 설명, 관련 자료
          </button>
        </div>
      </div>
      <div className="resultpage-right-container">
        <div className="resultpage-rhdr "></div>
        <div className="resultpage-component"></div>
        <div className="resultpage-component">
          <h1>Result Text Area</h1>
        </div>
      </div>
    </div>
  );
};

/*
class ResultPage extends React.Component {
  render() {
    return (
      <div
        className="resultpage-wrapper"
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: center;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <h1>Hello!</h1>
          <h1>hello!</h1>
          <h1>hi</h1>
        </div>
        <div className="hi">
          <div
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <h1> 사과는 Apple!</h1>
            <h1>바나나는 맛있어</h1>
          </div>
        </div>
      </div>
    );
  }
}
*/
export default ResultPage;

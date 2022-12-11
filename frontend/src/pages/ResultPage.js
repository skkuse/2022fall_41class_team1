import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../utils/axios";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { render } from "react-dom";
import Logo from "../assets/Logo.png";
import Play from "../assets/play.svg";

/*
const ResultPage = () => {

  render() {
    return (
      <div className="resultpage-wrapper">
        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        ></div>
      </div>
    );   
  }
};
*/
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
          className="resultpage-lcont"
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            className="resultpage-lhdr"
            css={css`
              display: flex;
              justify-content: center;
            `}
          >
            <img src={Logo} alt="codingtest" className="logo"></img>
          </div>
          <div
            className="resultpage-component"
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <button className="resultpage-button" onClick={() => {}}>
              <img src={Play}></img>
              제출 결과 (Overall Score)
            </button>
            <button className="resultpage-innerbutton" onClick={() => {}}>
              ㄴ 표절률 검사
            </button>
            <button className="resultpage-innerbutton" onClick={() => {}}>
              ㄴ 기능성 채점
            </button>
            <button className="resultpage-innerbutton" onClick={() => {}}>
              ㄴ 효율성 채점
            </button>
            <button className="resultpage-innerbutton" onClick={() => {}}>
              ㄴ 가독성 채점
            </button>
            <button className="resultpage-button" onClick={() => {}}>
              <img src={Play}></img>
              코드 설명, 관련 자료
            </button>
          </div>
        </div>
        <div
          className="resultpage-rcont"
          css={css`
            display: flex;
            flex-firection: column;
          `}
        >
          <div className="resultpage-rhdr">{this.props.name}</div>
          <div className="resultpage-component"></div>
          <div className="resultpage-component">
            <h1>Result Text Area</h1>
          </div>
        </div>
      </div>
    );
  }
}
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

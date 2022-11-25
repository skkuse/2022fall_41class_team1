import React, {useContext} from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import {Dropdown, Dropdownlist} from './Dropdown'
import { NowContext } from "../../context/NowContext";

function Problem() {
  const {now, setNow} = useContext(NowContext);

  return (
    <>
    <div css={problemStyle}>
    <div css={problemBox}>
        <div css={questionBox}>
          <a css={questionStyle}>문제</a>
        </div>
        <div css={textBox}>
          <a css={textStyle}>피보나치 수는 0과 1로 시작하며, 다음 피보나치 수는 바로 앞의 두 피보나치 수의 합이 된다.
          n = 0, 1...에 해당하는 피보나치 수는 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...이다.
          <br /><br />n번째 피보나치 수를 리턴하시오</a>
        </div>
        <div css={questionBox}>
          <a css={questionStyle}>참조 / 제약사항</a>
        </div>
        <div css={textBox}>
          <a css={textStyle}>리턴 타입이 int가 아니라는 것에 유의!</a>
        </div>
        <div css={questionBox}>
          <a css={questionStyle}>테스트케이스</a>
        </div>
    </div>
  </div>
  <span role="presentation" css={presentationStyle}></span>
  </>
  );
};
const problemStyle = css`
  flex: 0 0 auto;
  position: relative;
  width: 33%;
`;

const problemBox = css`
  display: flex;
  flex: 1 0 0%;
  overflow-y: auto;
  height: 100%;
  position: relative;
  flex-direction: column;
`;

const questionBox = css`
  padding: 0.75rem;
  top: 0px;
  display: flex;
  align-items: center;
  background-color: #f3f3f5;
  height: 5%;
`;

const questionStyle = css`
  margin: 0.25rem 0px 0px 20px;
  font-weight: bold;
  line-height: 1.1.;
  font-size: 1rem;
  color: black;
`;

const textBox = css`
  padding: 1.5rem;
`;

const textStyle = css`
  line-height: 1.6;
  overflow-wrap: break-word;
  word-break: break-word;
`;

const presentationStyle = css`
  width: 9px;
  margin: -4px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  cursor: col-resize;
  /* background-color: #585c6d;
  background-clip: padding-box;
  transition: all .3s ease; */
`;


export default Problem;

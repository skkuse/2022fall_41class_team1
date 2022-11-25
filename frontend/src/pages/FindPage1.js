import React from "react";
import InputBox from "../components/InputBox";
import GlobalStyle from "../components/GlobalStyle";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

function FindPage1(props) {
  return (
    <>
      <GlobalStyle />
      <div>
        <div css = {join_wrap}></div>
          <h1>비밀번호 찾기</h1>
          <p css = {register_txt}>
            가입 시 등록했던 이메일로
              <br />비밀번호를 변경할 수 있는 메일을 보내드릴게요.</p>
          <InputBox text={"이메일"} type="email"/>
          <button css={sendingbtn}>전송하기</button>
        <div css = {back_login}>
          <span>비밀번호가 생각나셨나요?</span>
          <a css = {go_login}><Link to="/login">로그인하기</Link></a>
        </div>
      </div>
    </>
  );
};

const join_wrap = css`
  width: 100%;
  max-width: 400px;
  padding-top: 24px;
`;

const register_txt = css`
  padding-bottom: 15px;
  margin-top: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  letter-spacing: -.5px;
  color: #4b4b4b;
`;

const sendingbtn = css`
  margin-top: 31px;
  position: relative;
  display: block;
  width: 100%;
  outline: none;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  letter-spacing: -.5px;
  border-radius: 4px;
  color: #fff;
  background: #0d0d0d;
  border: none;
  cursor: pointer;
  height: 50px;
  line-height: 50px;
`

const back_login = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  padding-top: 72px;
  word-break: keep-all;

`

const go_login = css`
  margin-left: 16px;
  display: inline-block;
  letter-spacing: -.5px;
  text-decoration: underline;
  text-underline-position: under;
  color: #0d0d0d;
  box-sizing: border-box;

`

const textWhite = css`
  color: #FFF;
`
export default FindPage1;

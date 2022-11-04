import React from "react";
import InputBox from "../components/InputBox";

//* @jsxImportSource @emotion/react
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import GlobalStyle from "../components/GlobalStyle";

const LoginPage = () => {
  return (
    <>
      <GlobalStyle />
      <div>
        <section>
          <InputBox text={"이메일"} />
          <InputBox text={"비밀번호"} />
          <span css={warningMsg}>가입되어 있지 않은 계정이거나, 이메일 또는 비밀번호가 일치하지 않습니다.</span>
          <button css={loginBtn}><Link to="/" css={textWhite}>로그인</Link></button>
          <div css={loginFindBox}>
            <a css={loginFind}>비밀번호 찾기</a>
          </div>
        </section>
      </div>
    </>
  );
};

const warningMsg = css`
  color: #F21724;
  font-size: 12px;
  display: inline-block;
  text-align: left;
`;
const loginBtn = css`
  margin-top: 37px;
  position: relative;
  display: block;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.5px;
  border-radius: 4px;
  background: #0d0d0d;
  border: none;
  cursor: pointer;
  height: 50px;
  line-height: 50px;
  width: 100%;
`;
const textWhite = css`
  color: #FFF;
`
const loginFindBox = css`
  display: flex;
  padding-top: 13px;
  position: relative;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: #0d0d0d;
  width: 100%;
`;
const loginFind = css`
  height: 36px;
  padding-right: 23px;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  line-height: 36px;
  text-align: right;
  letter-spacing: -0.5px;
  color: #0d0d0d;
`;

export default LoginPage;

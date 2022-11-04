import React from "react";
import InputBox from "../components/InputBox";
import GlobalStyle from "../components/GlobalStyle";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function RegisterPage(props) {
  return (
    <>
      <GlobalStyle />
      <div>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <h1>이메일로 가입하기</h1>
          <div css={[inputBoxText]}>이메일 주소</div>
          <div css={inputContainer}>
            <input css={inputBox} type="email"/>
            <button type="button" css={verifyBtn}>
            </button>
          </div>
              <div css={inputBoxText}>인증번호 입력</div>
              <div css={inputContainer}>
                <input css={inputBox} type="verify" />
                <button type="button" css={verifyBtn}>
                </button>
              </div>
          <InputBox text={"비밀번호"} type="password" placeholder={"8자 이상"} />
          <span css={warningMsg}>경고</span>
          <InputBox text={"비밀번호 확인"} type="password" placeholder={"8자 이상"} />
          <span css={warningMsg}>경고</span>

          <div css={buttonArea}>
            <button type="button" css={[registerBtn, previous]}>이전</button>
            <button type="submit" css={[registerBtn, complete, textWhite]}>다음</button>
          </div>
        </form>
      </div>
    </>
  );
}
const buttonArea = css`
  position: relative;
  align-items: center;
  display: flex;
  margin-top: 120px;
`;
const warningMsg = css`
  color: #F21724;
  font-size: 12px;
  display: inline-block;
  text-align: left;
  padding-top: 8px;
`;
const registerBtn = css`
  display: block;
  position: relative;
  background: #fff;
  margin-top: 24px;
  cursor: pointer;
  height: 50px;
  color: #0d0d0d;
  text-align: center;
  letter-spacing: -0.5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  border-radius: 4px;
`;
const previous = css`
  width: 60%;
  border: 1px solid #ccc;
  margin-right: 8px;
`;
const complete = css`
  width: 100%;
  background: #141414;
  color: #fff;
`;
const textWhite = css`
  color: #fff;
`;

const inputBoxText = css`
  font-weight: 700;
  font-size: 14px;
  line-height: 140%;
  display: flex;
  align-items: center;
  letter-spacing: -0.5px;
  color: #0d0d0d;
  margin-top: 16px;
`;
const inputBorderSuccess = css`
  border-color: #189f14;
`;
const inputContainer = css`
  position: relative;
  padding-top: 16px;
  display: flex;
`;
const inputBox = css`
  position: relative;
  padding: 17px 12px;
  padding-top: 18px;
  width: 75%;
  height: 42px;
  -webkit-appearance: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.5px;
  color: #0d0d0d;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
`;
const verifyBtn = css`
  color: #fff;
  border: none;
  border-radius: 4px;
  background-color: #000;
  width: 25%;
  height: 42px;
  margin-left: 8px;
  cursor: pointer;
`;

export default RegisterPage;

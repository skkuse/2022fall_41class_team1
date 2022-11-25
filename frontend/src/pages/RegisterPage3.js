import React from "react";
import InputBox from "../components/InputBox";
import GlobalStyle from "../components/GlobalStyle";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const RegisterPage3 = () => {
  return (
    <>
    <GlobalStyle />
      <div className="RegisterPage3">
        <header css={headerStyle}>
          <div css={[register, title]}>회원 정보 입력하기</div>
          <div css={[register, subTitle]}>이제 마지막 단계에요!</div>
        </header>
        <InputBox text={"사용자 이름"} />
        <InputBox text={"소속"} />
        <div css={[register, formTitle]}></div>
        <div css={urlWrap}>
          <div css={itsFineDomain}>itsfine.net/</div>
          <label css={registerLabel}>
            <input css={registerInput}></input>
          </label>
        </div>
        <button css={registerBtn}><Link to="/" css={textWhite}>완료</Link></button>
      </div>
    </>
  );
};

const headerStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 32px;
`;
const register = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  letter-spacing: -0.5px;
`;
const title = css`
  text-align: center;
  color: rgb(16, 28, 51);
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
`;
const subTitle = css`
  -webkit-box-pack: start;
  text-align: center;
  color: rgb(16, 28, 51);
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
`;
const formTitle = css`
  -webkit-box-pack: start;
  -webkit-box-align: center;
  align-items: center;
  color: rgb(13, 13, 13);
  font-weight: 700;
  font-size: 14px;
  line-height: 140%;
  margin-top: 17px;
  margin-bottom: 8px;
`;
const urlWrap = css`
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  background: rgb(249, 250, 251);
  border: 1px solid rgb(233, 235, 237);
  box-sizing: border-box;
  border-radius: 4px;
  padding: 12px 24px;
  margin-bottom: 32px;
  transition: padding 0.3s ease 0s;
  margin-top: 9px;
`;
const itsFineDomain = css`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: start;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 2px;
`;
const registerLabel = css`
  width: 100%;
  outline-style: none;
  border: none;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  -webkit-box-align: center;
  align-items: center;
  text-align: justify;
  color: rgb(30, 30, 30);
  padding: 0px;
`;
const registerInput = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  border: 1px solid rgb(219, 222, 226);
  padding: 16px 20px;
  width: 85%;
`;
const registerBtn = css`
  margin-top: 50px;
  position: relative;
  display: block;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.5px;
  border-radius: 4px;
  color: #fff;
  background: #0d0d0d;
  border: none;
  cursor: pointer;
  height: 50px;
  line-height: 50px;
  width: 100%;
`;
const textWhite = css`
  color: #FFF;
`;
export default RegisterPage3;

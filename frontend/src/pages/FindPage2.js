import React from "react";
import InputBox from "../components/InputBox";
import SocialLoginBtn from "../components/SocialLoginBtn";
import GlobalStyle from "../components/GlobalStyle";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const FindPage2 = () => {
  return (
    <>
      <GlobalStyle />
      <p>
      비밀번호 재설정을 위한 이메일을 전송했습니다.<br />
      메일함을 확인해주세요!
      </p>
      <button css={check_btn}><Link to="/login" css={textWhite}>확인</Link></button>
      <span css={pwd_txt}>메일이 오지 않았다면, <b>스팸메일함</b>을 확인하거나 <span css={back_txt}><Link to="/find1">재전송</Link></span>을 해주세요.</span>
    </>
  );
};

const check_btn = css`
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
const pwd_txt = css`
  font-size: 12px;
  padding-top: 8px;

`
const back_txt = css`
  cursor: pointer;
  text-decoration: underline;
  text-underline-position: under;
`


const textWhite = css`
  color: #FFF;
`
export default FindPage2;

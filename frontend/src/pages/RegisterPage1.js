import React from "react";
import GlobalStyle from "../components/GlobalStyle";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import { Link } from "react-router-dom";
import kakao from "../assets/KakaoLogo.png";
import google from "../assets/GoogleLogo.png";
import naver from "../assets/NaverLogo.png";

const REDIRECT_URI = "http://localhost:3000/oauth/redirect";

// const KAKAO_AUTH_URL = `http://oracle.kor98won.kro.kr:8080/oauth2/authorization/kakao?redirect_uri=${REDIRECT_URI}`;
// const GOOGLE_AUTH_URL = `http://oracle.kor98won.kro.kr:8080/oauth2/authorization/google?redirect_uri=${REDIRECT_URI}`;
// const NAVER_AUTH_URL = `http://oracle.kor98won.kro.kr:8080/oauth2/authorization/naver?redirect_uri=${REDIRECT_URI}`;

const RegisterPage1 = () => {
  return (
    <>
    <GlobalStyle />
      <div className="RegisterPage1">
        <h1>반가워요 !</h1>
        <p>
          통합회원으로
          <br />
          간편하게 이용하세요
        </p>
        <div css={socialBox}>
          <ul css={ulStyle}>
            <a css={social}><li css={social_kakao}> <img css={image} src={kakao}/> 카카오로 3초만에 가입하기</li></a>
            <a css={social}><li css={social_google}><img css={image} src={google}/>구글로 가입하기</li></a>
            <a css={social}><li css={social_naver}><img css={image} src={naver}/>네이버로 가입하기</li></a>
          </ul>
        </div>
        <div css={register_box}>
          <div css={register_line}></div>
          <p css={register_text}>또는</p>
          <div css={register_line}></div>
        </div>
        <div css={signUpBar}><Link to="/register2">이메일로 가입하기</Link></div>
        <div css={login_box}>
        <span>이미 계정이 있으신가요?</span>
        <span css={linkToLogin}><Link to="/login">로그인하기</Link></span>
        </div>
      </div>
    </>
  );
};


const socialBox = css`
  padding: 20px 0 0;

`;

const social = css`
  font-weight: 700;
  font-size: 14px;
  text-align: center;
  letter-spacing: -.5px;
`;

const signUpBar = css`
  cursor: pointer;
  position: relative;
  width: 100%;
  border: 1px solid #ccc;
  height: 32px;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 12px;
  padding-top: 10px;
  font-weight: 700;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  letter-spacing: -.5px;
`;

const ulStyle = css`
  margin: 0;
  width: 100%;
  list-style: none;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0px;
  display: block;
`;

const social_kakao = css`
  background: #f9da49;
  color: #000!important;
  height: 44px;
  border-radius: 5px;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const social_google = css`
  background: #f5f6f7;
  color: #000;
  height: 44px;
  border-radius: 5px;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const social_naver = css`
  background: #5ecc6a;
  color: #fff;
  height: 44px;
  border-radius: 5px;
  margin-bottom: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const register_box = css`
  position: relative;
  align-items: center;
  display: flex;
  margin-top: 0px;
  flex-direction: row;
`;

const register_line = css`
  border-top: 1px solid #dfdfdf;
  width: 100%;
  height: 1px;
`;

const register_text = css`
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -.25px;
  color: #858585;
  width: 100px;
`;

const login_box = css`
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  line-height: 140%;
  padding-top: 72px;

`
const linkToLogin = css`
  margin-top: 50px;
  font-weight: 500;
  text-decoration: underline;
  padding: 20px;
`;

const image = css`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`

export default RegisterPage1;
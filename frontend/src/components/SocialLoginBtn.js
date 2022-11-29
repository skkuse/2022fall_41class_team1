import React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import kakao from "../assets/KakaoLogo.png";
import google from "../assets/GoogleLogo.png";
import naver from "../assets/NaverLogo.png";

const SocialLoginBtn = ({ onClick, type }) => {
  return (
    <button
    css={[socialLoginBtn, sns[type]]} onClick={onClick}>
    </button>
  );
};
const socialLoginBtn = css`
  cursor: pointer;
  border: none;
  border-radius: 5px;
  white-space: nowrap;
  position: relative;
  width: 48px;
  height: 48px;
  font-size: 0;
  border-radius: 50%;
  overflow: hidden;
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
`;
const sns = {
  kakao: {
    backgroundColor: "#F9DA49",
    backgroundImage: "url(" + kakao + ")",
  },
  google: {
    backgroundColor: "#F5F6F7",
    backgroundImage: "url(" + google + ")",
  },
  naver: {
    backgroundColor: "#5ECC6A",
    backgroundImage: "url(" + naver + ")",
  },
};
export default SocialLoginBtn;
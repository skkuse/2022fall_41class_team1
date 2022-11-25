import React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

const SocialRegisterBtn = ({ onClick, type }) => {
  return (
    <button
    css={[socialRegisterBtn, sns[type]]} onClick={onClick}>
    </button>
  );
};
const socialRegisterBtn = css`
  font-weight: 700;
  font-size: 14px;
  line-height: 140%;
  text-align: center;
  letter-spacing: -.5px;
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  height: 44px;
  margin-bottom: 8px;
`;
  // const sns = {
  // "kakao": {
  //   backgroundColor: "#F9DA49",
  //   backgroundImage: "url(../assets/KakaoLogo.png)",
  //   backgroundSize: "50%",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  // },
  // "google": {
  //   backgroundColor: "#F5F6F7",
  //   backgroundImage: "url(../assets/GoogleLogo.png)",
  //   backgroundSize: "50%",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  // },
  // "naver": {
  //   backgroundColor: "#5ECC6A",
  //   backgroundImage: "url(../assets/naverLogo.png)",
  //   backgroundSize: "50%",
  //   backgroundPosition: "center",
  //   backgroundRepeat: "no-repeat",
  // },
// };

export default SocialRegisterBtn;
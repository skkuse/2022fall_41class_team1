import React from "react";
/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";

const globalStyle = css`
  body {
    font-weight: 400;
    font-family: Pretendard;
    text-align: left;
    line-height: 1.5;
    color: white;
    background-color: #10162f;
  }
  @media (min-width: 1024px) {
    :root {
      --elements-headerHeight: 5rem;
    }
  }
  :root {
    --onetrust-brand-purple: #3A10E5;
    --onetrust-color-gray-500: #828285;
    --onetrust-color-white: #fff;
  }
`;

const GlobalStyle = () => {
  return <Global styles={globalStyle} />
}

export default GlobalStyle;
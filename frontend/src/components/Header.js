/* eslint-disable */
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";


function Header() {
  return(
    <header css={headerStyle}>
      <nav css={navStyle}>
        <ul css={menuBar}>
          <li css={menu}><a>메뉴1</a></li>
          <li css={menu}><a>커뮤니티</a></li>
        </ul>
        </nav>
        </header>
  );
}
const headerStyle = css`
  position: relative;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid #e4e8e8;
  background-color: black;
  z-index: 14;
`;
const navStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
`;
const menuBar = css`
  display: flex;
  justify-content: flex-start;
`;
const menu = css`
  color: #3d3d3e;
  text-align: center;
  line-height: 56px;
  cursor: pointer;
  margin: 0 10px;
  a {
    text-decoration: none;
    color: #3d3d3e;
  }
  &:hover {
    font-weight: bold;
  }
  &:active {
    font-weight: bold;
  }
`;





export default Header;

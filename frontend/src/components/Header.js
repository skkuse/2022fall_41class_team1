/* eslint-disable */
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BiHome } from 'react-icons/bi';
import { BiAlarm } from 'react-icons/bi';
import { BiCog } from 'react-icons/bi';
import GlobalStyle from "./GlobalStyle";

function Header() {
  return(
    <>
    <GlobalStyle />
    <header css={headerStyle}>
      <div css={headerWrapper}>
        <div css={section1}>
          <BiHome css={homeBtn} href="/"/>
          <a css={subjectName}>소프트웨어공학</a>
          <a css={subjectName}>week1 : 피보나치 수</a>
        </div>
        <div css={section2}>
          <BiAlarm css={alarmBtn} />
          <BiCog css ={cogBtn} />
        </div>
      </div>
      </header>
      </>
  );
}

const headerStyle = css`
  position: relative;
  height: 64px;
  border-color: var(--color-navy-600);
  background-color: var(--color-shadow-solid);
  border-width: 1px;
  background-color: black;
`;

const headerWrapper = css`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
  height: 100%;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  min-width: 768px;
  flex: 1 1;
`;

const section1 = css`
  display: flex;
  align-items: center;
  height: 100%;
`;

const homeBtn = css`
  margin-left: 0px;
  margin-right: 0.75rem;
  cursor: pointer;
  position: relative;
  padding: 0px;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
`;

const subjectName = css`
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  cursor: pointer;
  background: none transparent;
  text-decoration: none;
  border: none;
  padding: 0px;
  font-size: inherit;
  white-space: initial;
  box-shadow: none;
  display: inline-block;
  position: relative;
`;

const section2 = css`
  justify-content: flex-end;
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 0px;
  flex: 1 1;
`;

const alarmBtn = css`
  cursor: pointer;
  display: flex;
  color: white;
  position: relative;
  padding: 0px;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  margin-right: 0.75rem;
`;

const cogBtn = css`
  margin-left: 0.75rem;
  margin-right: 0px;
  cursor: pointer;
  display: flex;
  color: white;
  position: relative;
  padding: 0px;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
`;






export default Header;

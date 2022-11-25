/* eslint-disable */
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BiHome } from 'react-icons/bi';
import { BiAlarm } from 'react-icons/bi';
import { BiCog } from 'react-icons/bi';
import { Link } from "react-router-dom";
import search from '../../assets/search.svg';
import {Dropdown, Dropdownlist} from '../../pages/Dropdown'
import { NowContext } from "../../context/NowContext";


function Header() {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);



  return(
    
    <>
    <header css={headerStyle}>
      <div css={headerWrapper}>
        <div css={section1}>
          <BiHome css={homeBtn} href="/"/>
          <a css={subjectName}>소프트웨어공학</a>
          <a css={assignmentName}>week1 : 피보나치 수</a>
        </div>
        <input css={inputStyle} type="text" placeholder="검색" />
        <img src="search" alt="search" css={searchStyle}></img>
        <BiAlarm css={alarmBtn} />
        <BiCog css ={cogBtn} />
        <div css={section2}>
          <a css={loginBtn}><Link to="/login">로그인</Link></a>
          <a css={registerBtn}><Link to="/register1">회원가입</Link></a>
        </div>
      </div>
      </header>
      </>
  );
}

const headerStyle = css`
  position: relative;
  width: 100%;
  height: 65px;
  border-color: var(--color-navy-600);
  background-color: var(--color-shadow-solid);
  border-width: 1px;
  background-color: black;
  border-bottom-style: solid;
`;

const headerWrapper = css`
  padding-left: 2rem;
  padding-right: 2rem;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  margin-bottom: 0;
  height: 100%;
`;

const section1 = css`
  flex: 1 1;
  justify-content: flex-start;
`;

const homeBtn = css`
  margin-left: 0px;
  margin-right: 0.75rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: white;
  border: none;
`;

const subjectName = css`
  position: absolute;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  top: 14px;
  cursor: pointer;
  color: white;
  border: 2px;
`;

const assignmentName = css`
  position: absolute;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  top: 34px;
  cursor: pointer;
  color: white;
`;

const alarmBtn = css`
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: white;
`;

const cogBtn = css`
  margin-left: 0px;
  margin-right: 0.75rem;
  cursor: pointer;
  position: relative;
  padding: 0px;
  width: 30px;
  height: 30px;
  color: white;
  border: none;
`;

const inputStyle = css`
  position: absolute;
  width: 280px;
  height: 34px;
  left: 40%;
  top: 14px;
  padding: 0 5px 0 30px;
  background-color: #f9fafb;
  border: 1px solid #e4e8e8;
  border-radius: 15px;
`;

const searchStyle = css`
  position: absolute;
  width: 24px;
  height: 24px;
  margin-left: 61%;

`;

const section2 = css`
  flex: 1 1;
  justify-content: flex-end;
  
`;

const loginBtn = css`
  margin-left: 77%;
  cursor: pointer;
  color: white;
  margin-right: 0.75rem;
`;

const registerBtn = css`
  color: white;
  cursor: pointer;
  margin-left: 0.75rem;
`;
export default Header;

import React, {useCallback,useState,useContext} from 'react';
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { NowContext } from "../context/NowContext";
import axios from "axios";


const weeklist = [
  {
    text: 'Week 1',
  },
  {
    text: 'Week 2',
  },
  {
    text: 'Week 3',
  },
  {
    text: 'Week 4',
  },
  {
    text: 'Week 5',
  },
  {
    text: 'Week 6',
  },
];

const week1 = {problem: '문제 1번',constraint: '제약조건 1번',testcase: '테스트케이스 1번',save1: '#save1-1',save2: '#save1-2',save3: '#save1-3'};
const week2 = {problem: '문제 2번',constraint: '제약조건 2번',testcase: '테스트케이스 2번',save1: '#save2-1',save2: '#save2-2',save3: '#save2-3'};
const week3 = {problem: '문제 3번',constraint: '제약조건 3번',testcase: '테스트케이스 3번',save1: '#save3-1',save2: '#save3-2',save3: '#save3-3'};
const week4 = {problem: '문제 4번',constraint: '제약조건 4번',testcase: '테스트케이스 4번',save1: '#save4-1',save2: '#save4-2',save3: '#save4-3'};
const week5 = {problem: '문제 5번',constraint: '제약조건 5번',testcase: '테스트케이스 5번',save1: '#save5-1',save2: '#save5-2',save3: '#save5-3'};
const week6 = {problem: '문제 6번',constraint: '제약조건 6번',testcase: '테스트케이스 6번',save1: '#save6-1',save2: '#save6-2',save3: '#save6-3'};


const Dropdown = (props) => {
  return(
    <article>
      { props.visibility && props.children }
    </article>
  );
}

function Dropdownlist (props) {
  const {now, setNow} = useContext(NowContext);
  const [question, setQuestion]=useState("");

  const handleclick = (week) => {
    getQuestionInf();
    setNow(week);
  }

  const getQuestionInf = async() =>{
     const newData = {
        course: "SWE3002-41"
     };
     try {
        const response = await axios.get(
        "http://localhost:8000/main/main/question/",
        {params:newData}
     );
     console.log("response >>", response);
     setQuestion(response["data"]);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  return (
    <ul css={dropdownul}>
      {weeklist.map((item) => {
        return <li css={dropdownli} onClick={()=>handleclick(week2)}> {item.text} </li>
      })}
    </ul> 
  );
}
  
export {Dropdown, Dropdownlist};




const dropdownul = css`
  position: absolute;
  top: 65px;
  color: white;
  background-color: #000080;
  z-index: 2;
  width: 300px;
`;
const dropdownli = css`
  color: white;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
`;
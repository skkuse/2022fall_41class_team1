/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import PythonEditor from "./PythonEditor";
import Problem from "./Problem";

function Section(){

  return (
    <>
      <div css={flexBox}>
        <div css={splitStyle}>
          <Problem />
          <PythonEditor />
          <textarea disabled='True' cols="40" rows="33">
          resultresultresult
          </textarea>
      </div>
      </div>
    </>
  );
}

const flexBox = css`
  display: flex;
  height: 100%;
  position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  font-family: pretendard;
`;


const splitStyle = css`
  flex: 1 1 0%;
  display: flex;
  height: 100%;
  /* position: absolute; */
  overflow: hidden;
  flex-direction: row;
  left: 0px;
  right: 0px;
`;



export default Section;

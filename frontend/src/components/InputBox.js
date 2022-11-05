import React from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

const InputBox = ({ type, id, text, value, onChange, placeholder }) => {
  return (
    <div css={inputContainer}>
      <div css={inputBoxText}>{text}</div>
      <input css={inputBox} type={type} id={id} value={value} onChange={onChange} placeholder={placeholder}></input>
    </div>
  );
};

const inputContainer = css`
  position: relative;
  padding-top: 16px;
`;

const inputBox = css`
  position: relative;
  margin-top: 14px;
  padding: 17px 12px;
  padding-top: 18px;
  width: 100%;
  height: 42px;
  -webkit-appearance: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: -0.5px;
  color: #0d0d0d;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
`;

const inputBoxText = css`
  font-weight: 700;
  font-size: 14px;
  line-height: 140%;
  display: flex;
  align-items: center;
  letter-spacing: -0.5px;
  color: #0d0d0d;
`;

export default InputBox;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkUser, verifyUser } from "../_actions/userAction";
import { registerUser } from "../_actions/userAction";
import InputBox from "../components/InputBox";
import GlobalStyle from "../components/GlobalStyle";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function RegisterPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const [Verify, setVerify] = useState({
    text: "인증",
    send: false,
  });
  const [Disable, setDisable] = useState(true);

  const [VerifyCheck, setVerifyCheck] = useState({
    text: "인증하기",
    send: false,
  });
  const [VerifyKey, setVerifyKey] = useState("");
  const [PwMsg1, setPwMsg1] = useState("");
  const [PwMsg2, setPwMsg2] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onEmailDisableHandler = (e) => {
    setEmail(e.currentTarget.value);
    Email.includes("@")
    ? setDisable(false)
    : setDisable(true);
  }

  const onVerifyKeyHandler = (e) => {
    setVerifyKey(e.currentTarget.value);
  }

  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
    setPwMsg1("");
  };

  const onPasswordConfirmHandler = (e) => {
    setPasswordConfirm(e.currentTarget.value);
    setPwMsg1("");
    setPwMsg2("");
  };


  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Request API.

    if (Password.length === 0) {
      setPwMsg1("비밀번호를 입력해 주세요.");
    } else if (Password.length < 8) {
      setPwMsg1("8자리 이상의 비밀번호를 입력해 주세요.");
    } else if (PasswordConfirm.length === 0) {
      setPwMsg1("비밀번호를 한번 더 확인해 주세요.");
    } else if (Password === PasswordConfirm) {
      let body = {
        email: Email,
        password: Password,
        // name: Name,
        // company: Company,
        // url: Url,
      };
      dispatch(registerUser(body)).then((res) => {
        navigate("/register3");
      });
    } else {
      setPwMsg1("");
      setPwMsg2("비밀번호가 일치하지 않습니다. 다시 확인해 주세요.");
    };
}

  const sendOk = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
    };
    dispatch(verifyUser(body)).then((res) => { 
    });

    setVerify({
      text: "재전송",
      send: true,
    });
  }
  
  const keyCheck = (e) => { 
    e.preventDefault();

    let body = {
      email: Email,
      key: VerifyKey,
    };

    dispatch(checkUser(body)).then((res) => {
      console.log(res);
      if (res.payload.data.status === "OK") {

        setVerifyCheck({
          text: "인증완료",
          send: true,
        });
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <>
      <GlobalStyle />
      <div>
        <form onSubmit={onSubmitHandler} style={{ display: "flex", flexDirection: "column" }}>
          <h1>이메일로 가입하기</h1>
          <div css={[inputBoxText]}>이메일 주소</div>
          <div css={inputContainer}>
            <input css={inputBox} type="email" value={Email} onChange={onEmailDisableHandler} required/>
            <button type="button" css={verifyBtn} onClick={sendOk} disabled={Disable}>
              {Verify.text}
            </button>
          </div>
          {Verify.send === true ? (
            <>
              <div css={inputBoxText}>인증번호 입력</div>
              <div css={inputContainer}>
                <input css={inputBox} type="verify" value={VerifyKey} onChange={onVerifyKeyHandler} required/>
                <button type="button" css={verifyBtn} onClick={keyCheck}>
                  {VerifyCheck.text}
                </button>
              </div>
            </>
          ) : null}
          <InputBox text={"비밀번호"} type="password" value={Password} onChange={onPasswordHanlder} placeholder={"8자 이상"} />
          <span css={warningMsg}>{PwMsg1}</span>
          <InputBox text={"비밀번호 확인"} type="password" value={PasswordConfirm} onChange={onPasswordConfirmHandler} placeholder={"8자 이상"} />
          <span css={warningMsg}>{PwMsg2}</span>

          <div css={buttonArea}>
            <button type="button" css={[registerBtn, previous]} onClick={() => navigate(-1)}>이전</button>
            <button type="submit" css={[registerBtn, complete, textWhite]}>다음</button>
          </div>
        </form>
      </div>
    </>
  );
}
const buttonArea = css`
  position: relative;
  align-items: center;
  display: flex;
  margin-top: 120px;
`;
const warningMsg = css`
  color: #F21724;
  font-size: 12px;
  display: inline-block;
  text-align: left;
  padding-top: 8px;
`;
const registerBtn = css`
  display: block;
  position: relative;
  background: #fff;
  margin-top: 24px;
  cursor: pointer;
  height: 50px;
  color: #0d0d0d;
  text-align: center;
  letter-spacing: -0.5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  border-radius: 4px;
`;
const previous = css`
  width: 60%;
  border: 1px solid #ccc;
  margin-right: 8px;
`;
const complete = css`
  width: 100%;
  background: #141414;
  color: #fff;
`;
const textWhite = css`
  color: #fff;
`;

const inputBoxText = css`
  font-weight: 700;
  font-size: 14px;
  line-height: 140%;
  display: flex;
  align-items: center;
  letter-spacing: -0.5px;
  color: #0d0d0d;
  margin-top: 16px;
`;
const inputBorderSuccess = css`
  border-color: #189f14;
`;
const inputContainer = css`
  position: relative;
  padding-top: 16px;
  display: flex;
`;
const inputBox = css`
  position: relative;
  padding: 17px 12px;
  padding-top: 18px;
  width: 75%;
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
const verifyBtn = css`
  color: #fff;
  border: none;
  border-radius: 4px;
  background-color: #000;
  width: 25%;
  height: 42px;
  margin-left: 8px;
  cursor: pointer;
`;

export default RegisterPage;

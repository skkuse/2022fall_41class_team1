import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../_actions/userAction";
import { loginCheck } from "../_actions/changeStatus";
import { setCookie } from "../cookie";
import InputBox from "../components/InputBox";
import SocialLoginBtn from "../components/SocialLoginBtn";
import GlobalStyle from "../components/GlobalStyle";
import rootReducer from "../_reducers/index";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";



function LoginPage(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [LoginMsg, setLoginMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
    setLoginMsg("");
  };
  const onPasswordHanlder = (e) => {
    setPassword(e.currentTarget.value);
    setLoginMsg("");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const body = {
      user_id: 1234,
      user_name: "asdf",
      user_pwd: 1234,
      user_type: 1,
      user_email: "hello@naver.com",
      user_org: "asdf",
    };
    dispatch(loginUser(body))
      .then((res) => {
        console.dir(res);
        if (res.payload.data.status === "OK") {
          navigate("/");
          localStorage.setItem('access_token', res.payload.data.data.access_token);
           dispatch(loginCheck());
           console.dir(res); //여기 아마 useraction 파일 참조하는데 api 달라서 오류나는듯?
          
        } else {
          setLoginMsg("가입되어 있지 않은 계정이거나, 이메일 또는 비밀번호가 일치하지 않습니다.");
           alert(res.payload.data.message); // "잘못된 비밀번호입니다."
        }
      })
      .catch((err) => {
        setLoginMsg("가입되어 있지 않은 계정이거나, 이메일 또는 비밀번호가 일치하지 않습니다.");
        console.log(err);
      });
  };

  return (
    <>
      <GlobalStyle />
      <div>
        <section>
          <form onSubmit={onSubmitHandler} style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="email"></label>
            <InputBox type="email" id="email" text={"이메일"} value={Email} onChange={onEmailHandler} />
            <label htmlFor="password"></label>
            <InputBox type="password" id="password" text={"비밀번호"} value={Password} onChange={onPasswordHanlder} />
            <span css={warningMsg}>{LoginMsg}</span>
            <button type="submit" css={[loginBtn, textWhite]}>로그인</button>
          </form>

          <div css={loginFindBox}>
            <Link to="/find1" css={loginFind}>비밀번호 찾기</Link>
          </div>
          
          <div css={socialLoginBox}>
            <p css={pStyle}>SNS로 간편하게 시작하기</p>
            <ul css={ulStyle}>
              <li css={liStyle}>
                <SocialLoginBtn type={"kakao"} />
              </li>
              <li css={liStyle}>
                <SocialLoginBtn type={"google"} />
              </li>
              <li css={liStyle}>
                <SocialLoginBtn type={"naver"} />
              </li>
            </ul>
          </div>
          <span css={checkMsg}>아직 회원이 아니세요?</span>
          <span css={linkToRegister}><Link to="/register1">회원가입하기</Link></span>
        </section>
      </div>
    </>
  );
}
const warningMsg = css`
  color: #F21724;
  font-size: 12px;
  display: inline-block;
  text-align: left;
  padding-top: 16px;
`;
const loginBtn = css`
  margin-top: 37px;
  position: relative;
  display: block;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  letter-spacing: -0.5px;
  border-radius: 4px;
  background: #0d0d0d;
  border: none;
  cursor: pointer;
  height: 50px;
  line-height: 50px;
  width: 100%;
`;
const textWhite = css`
  color: #FFF;
`
const loginFindBox = css`
  display: flex;
  padding-top: 13px;
  position: relative;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: #0d0d0d;
  width: 100%;
`;
const loginFind = css`
  height: 36px;
  padding-right: 23px;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  line-height: 36px;
  text-align: right;
  letter-spacing: -0.5px;
  color: #0d0d0d;
  text-decoration: underline;
`;
const socialLoginBox = css`
  padding: 50px 0 30px;
  text-align: center;
  width: 100%;
  align-items: center;
`;
const pStyle = css`
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;
const ulStyle = css`
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-left: 0px;
`;
const liStyle = css`
  display: list-item;
  position: center;
  padding-left: 10px;
  padding-right: 10px;
`;
const linkToRegister = css`
  font-weight: 500;
  text-decoration: underline;
  padding: 20px;
`
const checkMsg = css`
  padding-left: 13px;

`
export default LoginPage;

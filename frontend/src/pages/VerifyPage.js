import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function VerifyPage(props) {
  const onClickHandler = () => {
    alert("인증 완료되었습니다.");
  };
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <h1>Verify</h1>
      <button onClick={onClickHandler}>인증확인</button>
    </>
  );
}
// "<div style='margin:100px;'>" +
//                     "<h1> 안녕하세요 it's fine 입니다. </h1><br>" +
//                     "<p>아래 코드를 회원가입 창으로 돌아가 입력해주세요<p><br>" +
//                     "<p>감사합니다!<p><br>" +
//                     "<div align='center' style='border:1px solid black; font-family:verdana';>" +
//                         "<h3 style='color:blue;'>회원가입 코드입니다.</h3>" +
//                         "<div style='font-size:130%'>CODE : <strong>" + randomKey + "</strong>" +
//                     "</div><br>" +
//                 "</div>";
export default VerifyPage;

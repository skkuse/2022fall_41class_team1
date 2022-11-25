import styles from "./Main.css";

const Main = () => {
  return (
    <div className="desktop13">
      <div className="header" />
        <div className="week1">Week 1 : 피보나치 수</div>
      <div className="section_left">
        <div className="section1"/>
          <div className="line1"/>
          <dlv className="line2"/>
          <div className="line3"/>
          <div className="question_title1">문제</div>
          <div className="question_content1">피보나치 수는 0과 1로 시작하며, 다음 피보나치 수는 
            바로 앞의 두 피보나치 수의 합이 된다.
            a = 0, 1...에 해당하는 피보나치 수는 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...이다.
            n번째 피보나치 수를 리턴하시오. </div>
          <div className="line4"/>
          <div className="question_title2">참조 / 제약사항</div>
          <div className="question_content2">리턴 타입이 int가 아니라는것에 유의!</div>
        <div className="section2"/>
          <div className="testcase_title">테스트케이스</div>
          <div className="line5"/>
          <div className="testcase_content">테스트케이스1</div>
      </div>

      <div className="editor">
        <div className="editor_header">
          <button className="codeBtn1">1</button>
          <button className="codeBtn2">2</button>
          <button className="codeBtn3">3</button>
          <button className="runBtn">실행</button>
          <button className="evalBtn">채점</button>
          <button className="submitBtn">제출</button>
        </div>
      <div className="terminal">
        <div className="terminal_header">
          <button className="resultBtn1">실행결과</button>
          <button className="resultBtn2">제출결과</button>
          <button className="resultBtn3">테스트케이스</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Main;

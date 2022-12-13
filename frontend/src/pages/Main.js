import styles from "./Main.css";
import React, { useState, useRef, useLayoutEffect, useContext, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Editor, { useMonaco, DiffEditor } from "@monaco-editor/react";
import axios from "axios";
// import { Dropdown, Dropdownlist } from "./Dropdown";
import { NowContext } from "../context/NowContext";
import Split from 'react-split';
import {Howl} from "howler";
import stage_clear from "../audios/stage_clear.mp3";
import Loading from "./Loading"



const Main = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [editorVisible, setEditorVisible] = useState(1);
  const [user_id, setUser_id] = useState(state.logAccount.user_email);
  const [course, setCourse] = useState(state.logAccount.user_course);
  const [code1, setCode1] = useState();
  const [code2, setCode2] = useState();
  const [code3, setCode3] = useState();
  const [original_code, setOriginal_code] = useState("#some comment");
  const [modified_code, setModified_code] = useState("#some comment");
  const [result, setResult] = useState("result display");
  const [reference, setReference] = useState({});
  const [resultShow, setResultShow] = useState();
  const [submitted, setSubmitted] = useState();
  const [analyzed_texts, setAnalyzed_texts] = useState("코드 분석");
  const [analyzed_texts_co, setAnalyzed_texts_co] = useState("코드 분석 한국어");
  const [test_case_texts, setTest_case_texts] = useState("테스트 케이스");
  const [problemlist, setProblemlist] = useState([]);
  const [selectedproblem, setSelectedproblem] = useState(state.initial_problem);
  const [opentestcase, setOpentestcase] = useState([]);
  const [hiddentestcase, setHiddentestcase] = useState([]);
  const [loading, setLoading] = useState(false);


  const [score,setScore]=useState();
  const [efficiencya,setEfficiencya]=useState();
  const [efficiencyb,setEfficiencyb]=useState();
  const [copy,setCopy]=useState();
  const [readability, setReadability]=useState();
  const [test_case_boolean, setTest_case_boolean] = useState();

  const editorRef1 = useRef(null);
  const editorRef2 = useRef(null);
  const editorRef3 = useRef(null);
  const diffEditorRef = useRef(null);
  const monaco = useMonaco();

  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const { now, setNow } = useContext(NowContext);

  function handleEditor1DidMount(editor, monaco) {
    editorRef1.current = editor;
    monaco.editor.defineTheme("myTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [{ background: "EDF9FA" }],
      colors: {
        "editor.foreground": "#000000",
        "editor.background": "#EDF9FA",
        "editorCursor.foreground": "#8B0000",
        "editor.lineHighlightBackground": "#0000FF20",
        "editorLineNumber.foreground": "#008800",
        "editor.selectionBackground": "#88000030",
        "editor.inactiveSelectionBackground": "#88000015",
      },
    });
    monaco.editor.setTheme("myTheme");
    editorRef1.current.onDidChangeModelContent(() => {
      editor.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(1, 100),
            options: { inlineClassName: "myInlineDecoration" },
          },
        ]
      );
      setCode1(editorRef1.current.getValue());
    });
  }
  function handleEditor2DidMount(editor, monaco) {
    editorRef2.current = editor;
    monaco.editor.defineTheme("myTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [{ background: "EDF9FA" }],
      colors: {
        "editor.foreground": "#000000",
        "editor.background": "#EDF9FA",
        "editorCursor.foreground": "#8B0000",
        "editor.lineHighlightBackground": "#0000FF20",
        "editorLineNumber.foreground": "#008800",
        "editor.selectionBackground": "#88000030",
        "editor.inactiveSelectionBackground": "#88000015",
      },
    });
    monaco.editor.setTheme("myTheme");
    editorRef2.current.onDidChangeModelContent(() => {
      editor.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(1, 100),
            options: { inlineClassName: "myInlineDecoration" },
          },
        ]
      );
      setCode2(editorRef2.current.getValue());
    });
  }
  function handleEditor3DidMount(editor, monaco) {
    editorRef3.current = editor;
    monaco.editor.defineTheme("myTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [{ background: "EDF9FA" }],
      colors: {
        "editor.foreground": "#000000",
        "editor.background": "#EDF9FA",
        "editorCursor.foreground": "#8B0000",
        "editor.lineHighlightBackground": "#0000FF20",
        "editorLineNumber.foreground": "#008800",
        "editor.selectionBackground": "#88000030",
        "editor.inactiveSelectionBackground": "#88000015",
      },
    });
    monaco.editor.setTheme("myTheme");
    editorRef3.current.onDidChangeModelContent(() => {
      editor.deltaDecorations(
        [],
        [
          {
            range: new monaco.Range(1, 100),
            options: { inlineClassName: "myInlineDecoration" },
          },
        ]
      );
      setCode3(editorRef3.current.getValue());
    });
  }

  function handleDiffEditorDidMount(editor, monaco) {
    diffEditorRef.current = editor;
    monaco.editor.defineTheme("myTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [{ background: "EDF9FA" }],
      colors: {
        "editor.foreground": "#000000",
        "editor.background": "#EDF9FA",
        "editorCursor.foreground": "#8B0000",
        "editor.lineHighlightBackground": "#0000FF20",
        "editorLineNumber.foreground": "#008800",
        "editor.selectionBackground": "#88000030",
        "editor.inactiveSelectionBackground": "#88000015",
      },
    });
    monaco.editor.setTheme("myTheme");
  }

  function handleEditorValidation(markers) {
    // model markers
    markers.forEach((marker) => console.log("onValidate:", marker.message));
  }

  const showValue = async () => {
    var newData = {};
    if (editorVisible == 1) {
      newData = {
        code: editorRef1.current.getValue(),
      };
    } else if (editorVisible == 2) {
      newData = {
        code: editorRef2.current.getValue(),
      };
    } else if (editorVisible == 3) {
      newData = {
        code: editorRef3.current.getValue(),
      };
    }

    try {
      saveData();
      const response = await axios.get("http://localhost:8000/test/execute2/", {
        params: newData,
      });
      get_testcase();
      console.log("response >>", response);
      console.log(response["data"]["code"]);
      var responseList = response["data"]["code"].split("&");
      if (responseList[0] == "0") {
        setResult(responseList[1]);
      } else {
        if (editorVisible == 1) {
          errorShow(editorRef1, parseInt(responseList[1]));
        } else if (editorVisible == 2) {
        } else if (editorVisible == 3) {
        }
        setResult(responseList[2]);
      }

      //console.log("실행결과 작성 완료");
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const errorShow = (editorRef, lines) => {
    //console.log("debug");
    //console.log(lines)
    editorRef.current.deltaDecorations(
      [],
      [
        {
          range: new monaco.Range(lines, 1, lines + 1, 1),
          options: { inlineClassName: "myInlineDecoration" },
        },
      ]
    );
  };


  useLayoutEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    // or make sure that it exists by other ways
    if (monaco) {
      // console.log("here is the monaco instance:", monaco);
    }

    getAllProblem();
    getQuestionInfo();
  }, [monaco]);

  const getAllProblem = async () => {
    try {
      const response = await axios.get("http://localhost:8000/main/question/", {
        params: {
          course: course,
        },
      });
      //console.log("response_getallproblem >>", response.data);
      setProblemlist(response.data.sort());
    } catch (error) {
      console.log("Error >>", error);
    }
  };

  const sound = new Howl({
    src: stage_clear,
  });

  const saveData = async () => {
    var newData = {};
    if (editorVisible == 1) {
      newData = {
        user_id: user_id,
        question: selectedproblem,
        count: editorVisible,
        code: editorRef1.current.getValue(),
      };
    } else if (editorVisible == 2) {
      newData = {
        user_id: user_id,
        question: selectedproblem,
        count: editorVisible,
        code: editorRef2.current.getValue(),
      };
    } else if (editorVisible == 3) {
      newData = {
        user_id: user_id,
        question: selectedproblem,
        count: editorVisible,
        code: editorRef3.current.getValue(),
      };
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/editor/save/",
        newData
      );
      console.log("response >>", response);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const onReset1 = () => {
    setCode1("#some comment");
    //console.log(editorRef1.current.getValue());
  };
  const onReset2 = () => {
    setCode2("#some comment");
  };
  const onReset3 = () => {
    setCode3("#some comment");
  };
  const setOriginal = () => {
    if (editorVisible == 1) {
      setOriginal_code(editorRef1.current.getValue());
    } else if (editorVisible == 2) {
      setOriginal_code(editorRef2.current.getValue());
    } else if (editorVisible == 3) {
      setOriginal_code(editorRef3.current.getValue());
    }
  };
  const setModified = () => {
    setModified_code(editorRef1.current.getValue());
  };

  const handleChangeFile1 = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = (e) => {
      const content = e.target.result;
      setCode1(content);
    };
    fileData.readAsText(file);
  };
  const handleChangeFile2 = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = (e) => {
      const content = e.target.result;
      setCode2(content);
    };
    fileData.readAsText(file);
  };
  const handleChangeFile3 = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = (e) => {
      const content = e.target.result;
      setCode3(content);
    };
    fileData.readAsText(file);
  };

  const saveFile = (str, filename) => {
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:attachment/text," + encodeURI(str);
    hiddenElement.target = "_blank";
    hiddenElement.download = filename;
    hiddenElement.click();
  };

  const handleCopyClipBoard = async (text) => {
    try {
      //console.log(text);
      await navigator.clipboard.writeText(text);
    } catch (error) {
      alert("복사 실패!");
    }
  };

  const excuteResultDisplay = () => {};
  const submitResultDisplay = () => {};

  const submit = async () => {
    setSubmitted(1);
    setLoading(true);
    await showValue();

    await get_testcase();

    await analyze_code();

    await submit_evaluate();

    setOriginal();
    setModified();
    setLoading(false);
    setEditorVisible(4);
  };

  const get_testcase = async () => {
    var newData = {};
    if (editorVisible == 1) {
      newData = {
        question: selectedproblem,
        code: editorRef1.current.getValue(),
      };
      console.log(newData);
    } else if (editorVisible == 2) {
      newData = {
        question: selectedproblem,
        code: editorRef2.current.getValue(),
      };
    } else if (editorVisible == 3) {
      newData = {
        question: selectedproblem,
        code: editorRef3.current.getValue(),
      };
    }
    try {
      const response = await axios.get("http://localhost:8000/test/testcase/", {
        params: newData,
      });
      console.log("response_testcase >>", response);
      console.log(response["data"]);
      setTest_case_texts(response["data"]["msg"]);
      setScore(response["data"]["score"]);
      setTest_case_boolean(response["data"]["pf"]);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const analyze_code = async () => {
    var newData = {};
    if (editorVisible == 1) {
      newData = {
        code: editorRef1.current.getValue(),
      };
    } else if (editorVisible == 2) {
      newData = {
        code: editorRef2.current.getValue(),
      };
    } else if (editorVisible == 3) {
      newData = {
        code: editorRef3.current.getValue(),
      };
    }

    try {
      console.log(newData);
      const response = await axios.get(
        "http://localhost:8000/editor/simple_explain/",
        {
          params: newData,
        }
      );

      console.log("response_simple_explain>>", response);
      setSimpleAnalyzed_texts(response["data"]["code"]);
    } catch (err) {
      console.log("Error >>", err);
    }

    try {
      console.log(newData);
      const response = await axios.get(
        "http://localhost:8000/editor/detail_explain/",
        {
          params: newData,
        }
      );

      console.log("response_detailed_explain>>", response);
      setDetailanalyzed_texts(response["data"]["code"]);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const submit_evaluate = async () => {
    var newData = {};
    if (editorVisible == 1) {
      newData = {
        code: editorRef1.current.getValue(),
      };
    } else if (editorVisible == 2) {
      newData = {
        code: editorRef2.current.getValue(),
      };
    } else if (editorVisible == 3) {
      newData = {
        code: editorRef3.current.getValue(),
      };
    }

    try {
      const response1 = await axios.post(
        "http://localhost:8000/test/readability/",
        newData
      );
      console.log("response_readability >>", response1["data"]);
      setReadability(response1["data"]);
    } catch (err) {
      console.log("Error >>", err);
    }

    try {
      const response2 = await axios.post(
        "http://localhost:8000/test/copydetect/",
        newData
      );
      console.log("response_copy >>", response2["data"]);
      setCopy(response2["data"]["score"]);
    } catch (err) {
      console.log("Error >>", err);
    }

    try {
      const response3 = await axios.get(
        "http://localhost:8000/test/evaluate/",
        {
          params: newData,
        }
      );
      console.log("response_efficiency >>", response3["data"]);
      setEfficiencya(response3["data"]["e_score1"]);
      setEfficiencyb(response3["data"]["e_score2"]);
      // console.log(efficiencya);
      // console.log(efficiencyb);
    } catch (err) {
      console.log("Error >>", err);
    }
    try {
      const response4 = await axios.get(
        "http://localhost:8000/editor/reference/",
        {
          params: {question: selectedproblem},
        }
      );
      console.log("response reference>>", response4);
      setReference(response4);
      // console.log(efficiencyb);
    } catch (err) {
      console.log("Error >>", err);
    }
    try {
      const response5 = await axios.get(
        "http://localhost:8000/editor/translate/",
        {
          params: {language: analyzed_texts},
        }
      );
      console.log("response reference>>", response5);
      setAnalyzed_texts_co(response5["code"]);
      // console.log(efficiencyb);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const getQuestionInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/editor/allinfo/",
        {
          params: {
            user_id: user_id,
            question: selectedproblem,
          },
        }
      );
      console.log("response[data] >>", response["data"]);
      setNow({
        problem: response["data"].question,
        reference: response["data"].reference,
        testcase: response["data"].testcase,
        skeleton: response["data"].skeleton,
        save1: response["data"].save1,
        save2: response["data"].save2,
        save3: response["data"].save3,
      });
      setCode1(response["data"].save1);
      setCode2(response["data"].save2);
      setCode3(response["data"].save3);
      setOpentestcase(response["data"].testcase.split('&')[0].split('*'));
      setHiddentestcase(response["data"].testcase.split('&').splice(1, response["data"].testcase.split('&')[1].split('*').length));
      // console.log('tt ; ', response["data"].testcase);
      // console.log('optc  :', opentestcase);
      // console.log('hdtc  :', hiddentestcase);
      console.log("now: ", now);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const Dropdown = (props) => {
    return <article>{props.visibility && props.children}</article>;
  };

  function Dropdownlist(props) {
    const handleclick = (item) => {
      setSelectedproblem(item)
      getQuestionInfo();
    };

    return (
      <ul css={dropdownul}>
        {problemlist.map((item) => {
          return (
            <li css={dropdownli} onClick={() => handleclick(item)}>{item}</li>
          );
        })}
      </ul>
    );
  }

  const onAnalyzeClick = () => {
    navigate("/resultpage",{state: {efficiencya: efficiencya, efficiencyb: efficiencyb, copy: copy, score: {score: score, pf: test_case_boolean}, readability: readability,reference:reference, analyzed_texts:analyzed_texts,analyzed_texts_co:analyzed_texts_co}});
  };

  return (
    <div className="desktop13">
      {loading==true && <Loading className="loading"/>}
      <div className="header">
        <ul
          className="problemname"
          onClick={(e) => setDropdownVisibility(!dropdownVisibility)}
        >
          {selectedproblem}
          {dropdownVisibility ? " △" : " ▽"}
        </ul>
        <Dropdown visibility={dropdownVisibility}>
          <Dropdownlist />
        </Dropdown>
      </div>
      <Split className="main_section" sizes={[40,60]} minSize={[300,600]} gutterSize={20} cursor="col-resize">
        <Split className="section_left" sizes={[60,40]} minSize={[200,200]} gutterSize={20} direction="vertical">
          <div className="section1">
            <div className="question_title1">문제</div>
            <div className="question_line" />
            <div className="question_content1">{now.problem}</div>
            <div className="constraint_title">참조 / 제약사항</div>
            <div className="constraint_line" />
            <div className="constraint_content">{now.reference}</div>
          </div>
          <div className="section2">
            <div className="testcase_title">테스트케이스</div>
            <div className="testcase_line" />
            <div className="testcase_content">
              {opentestcase.map((tc) => {
                return <div>input : {tc}</div>;
              })}
            </div>
          </div>
        </Split>
        <Split className="editor" sizes={[60,40]} minSize={[280,200]} gutterSize={20} direction="vertical">

          <div className="editor_header_body">
            <div className="editor_header">
              <div classname="savebutton">
                <button
                  className="codeBtn1"
                  onClick={() => {
                    setEditorVisible(1);
                  }}
                >
                  1
                </button>
                <button
                  className="codeBtn2"
                  onClick={() => {
                    setEditorVisible(2);
                  }}
                >
                  2
                </button>
                <button
                  className="codeBtn3"
                  onClick={() => {
                    setEditorVisible(3);
                  }}
                >
                  3
                </button>
              </div>
              <div classname="functionbutton">
                <button className="saveBtn" onClick={saveData}>
                  저장
                </button>
                <button className="runBtn" onClick={showValue}>
                  실행
                </button>
                <button className="evalBtn" onClick={submit_evaluate}>
                  채점
                </button>
                <button className="submitBtn" onClick={submitted == 0
                      ? submit
                      : () => {
                          alert("you already submitted!");}}>
                  제출
                </button>
              </div>
            </div>
            <div className="onlyEditors">
              <div
                css={
                  editorVisible == 1
                    ? css`
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        height: 100%;
                      `
                    : css`
                        display: none;
                      `
                }
              >
                <Editor
                  id="Editor1"
                  value={code1}
                  width="100%"
                  theme="myTheme"
                  defaultLanguage="python"
                  defaultValue="# some comment"
                  onMount={handleEditor1DidMount}
                />
                <div className="editor_footer">
                  <div
                    css={css`
                      display: flex;
                      flex-direction: row;
                    `}
                  >
                    <label className="uploadLabel" for="fileBtn">
                      업로드
                    </label>
                    <input
                      id="fileBtn"
                      className="uploadBtn"
                      type="file"
                      onChange={(e) => handleChangeFile1(e.target.files[0])}
                      accept=".py"
                      css={css`
                        display: none;
                      `}
                    />
                    <button className="resetBtn" onClick={onReset1}>
                      초기화
                    </button>
                    <button
                      className="copyBtn"
                      onClick={() =>
                        handleCopyClipBoard(editorRef1.current.getValue())
                      }
                    >
                      복사
                    </button>
                    <button
                      className="downloadBtn"
                      onClick={() => {
                        saveFile(editorRef1.current.getValue(), "code1.py");
                      }}
                    >
                      다운로드
                    </button>
                  </div>
                </div>
              </div>
              <div
                css={
                  editorVisible == 2
                    ? css`
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        height: 100%;
                      `
                    : css`
                        display: none;
                        width: 100%;
                        height: 100%;
                      `
                }
              >
                <Editor
                  value={code2}
                  height="100%"
                  width="100%"
                  theme="myTheme"
                  defaultLanguage="python"
                  defaultValue="# some comment"
                  onMount={handleEditor2DidMount}
                />
                <div className="editor_footer">
                  <div css={css`display: flex; flex-direction: row`}>
                    <input className="uploadBtn" type="file" onChange={e => handleChangeFile2(e.target.files[0])} accept = ".py"/>
                    <button className="resetBtn" onClick={onReset2}>초기화</button>
                    <button className="copyBtn" onClick={() => handleCopyClipBoard(editorRef2.current.getValue())}>복사</button>
                    <button className="downloadBtn" onClick ={()=>{saveFile(editorRef2.current.getValue(), "code2.py")}}>다운로드</button>
                  </div>
                </div>
              </div>
              <div
                css={
                  editorVisible == 3
                    ? css`
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        height: 100%;
                      `
                    : css`
                        display: none;
                        width: 100%;
                        height: 100%;
                      `
                }
              >
                <Editor
                  value={code3}
                  height="100%"
                  width="100%"
                  theme="myTheme"
                  defaultLanguage="python"
                  defaultValue="# some comment"
                  onMount={handleEditor3DidMount}
                />
                <div className="editor_footer">
                  <div
                    css={css`
                      display: flex;
                      flex-direction: row;
                    `}
                  >
                    <label className="uploadLabel" for="fileBtn">
                      업로드
                    </label>
                    <input
                      id="fileBtn"
                      className="uploadBtn"
                      type="file"
                      onChange={(e) => handleChangeFile3(e.target.files[0])}
                      accept=".py"
                      css={css`
                        display: none;
                      `}
                    />
                    <button className="resetBtn" onClick={onReset3}>
                      초기화
                    </button>
                    <button
                      className="copyBtn"
                      onClick={() =>
                        handleCopyClipBoard(editorRef3.current.getValue())
                      }
                    >
                      복사
                    </button>
                    <button
                      className="downloadBtn"
                      onClick={() => {
                        saveFile(editorRef3.current.getValue(), "code3.py");
                      }}
                    >
                      다운로드
                    </button>
                  </div>
                </div>
              </div>
              <div
                css={
                  editorVisible == 4
                    ? css`
                        display: block;
                        width: 100%;
                        height: 100%;
                      `
                    : css`
                        display: none;
                        width: 100%;
                        height: 100%;
                      `
                }
              >
                <DiffEditor
                  height="100%"
                  width="100%"
                  theme="myTheme"
                  defaultLanguage="python"
                  original={original_code}
                  modified={modified_code}
                  onMount={handleDiffEditorDidMount}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div
            className="terminal"
            css={css`
              background-color: blue;
              display: flex;
              flex-direction: column;
            `}
            >
            <div className="terminal_header">
              <div className="flex_left">
                <button className="resultBtn1" onClick={() => setResultShow(0)}>
                  실행결과{" "}
                </button>
                <button
                  className="resultBtn2"
                  onClick={
                    submitted == 1
                      ? () => setResultShow(1)
                      : () => {
                          alert("you should submit before");
                        }
                  }
                >
                  제출결과
                </button>
                <button className="resultBtn3" onClick={() => setResultShow(2)}>
                  테스트케이스
                </button>
              </div>
              <div className="flex_right">
                <button
                  className="resultBtn4"
                  onClick={
                    submitted == 1
                      ? () => onAnalyzeClick()
                      : () => {
                          alert("you should submit before");
                        }
                  }
                >
                  코드분석
                </button>
              </div>
            </div>
            <div className="result_window">
              <div
                css={
                  resultShow == 0
                    ? css`
                        display: block;
                        height: 100%;
                      `
                    : css`
                        display: none;
                      `
                }
              >
                <textarea
                  value={result}
                  disabled="True"
                  css={css`
                    height: 100%;
                    width: 100%;
                  `}
                />
              </div>
              <div
                css={
                  resultShow == 1
                    ? css`
                        display: block;
                        height: 100%;
                      `
                    : css`
                        display: none;
                      `
                }
              >
                <textarea
                  value={
                    "Score: " +
                    score +
                    "\nMemory-efficiency: " +
                    efficiencya +
                    "\nTime-efficiency: " +
                    efficiencyb
                  }
                  disabled="True"
                  css={css`
                    height: 100%;
                    width: 100%;
                  `}
                />
              </div>
              <div
                className="tc_div"
                css={
                  resultShow == 2
                    ? css`
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                      `
                    : css`
                        display: none;
                      `
                }
              >
                <textarea
                  readonly
                  className="ttc_score"
                  value={"Score: " + score}
                  disabled="True"
                  css={css`
                    height: 10%;
                    width: 100%;
                  `}
                />
                <textarea
                  readonly
                  className="otc_area"
                  value={test_case_texts.split("&")[0]}
                  disabled="True"
                  css={css`
                    height: 45%;
                    width: 100%;
                  `}
                />
                <textarea
                  readonly
                  className="htc_area"
                  value={test_case_texts.split("&")[1]}
                  disabled="True"
                  css={css`
                    height: 45%;
                    width: 100%;
                  `}
                />
              </div>
              <div
                css={
                  resultShow == 3
                    ? css`
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                      `
                    : css`
                        display: none;
                      `
                }
              >
                <textarea
                  value={simpleanalyzed_texts}
                  disabled="True"
                  css={css`
                    height: 100%;
                    width: 100%;
                  `}
                />
              </div>
            </div>
          </div>
        </Split>
      </Split>

    </div>
  );
};

export default Main;

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

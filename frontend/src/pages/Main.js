import styles from "./Main.css";
import React, { useState, useRef, useEffect, useContext } from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Editor, { useMonaco, DiffEditor } from "@monaco-editor/react";
import axios from "axios";
import { Dropdown, Dropdownlist } from "./Dropdown";
import { NowContext } from "../context/NowContext";

const Main = () => {
  const [editorVisible, setEditorVisible] = useState(1);
  const [user_id, setUser_id] = useState("12344");
  const [question_no, setQuestion_no] = useState("1");
  const [code1, setCode1] = useState("#some comment");
  const [code2, setCode2] = useState("#some comment");
  const [code3, setCode3] = useState("#some comment");
  const [original_code, setOriginal_code] = useState("#some comment");
  const [modified_code, setModified_code] = useState("#some comment");
  const [result, setResult] = useState("result display");
  const [resultShow, setResultShow] = useState(0);

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
    if (editorVisible == 1) {
      const newData = {
        code: editorRef1.current.getValue(),
      };
    } else if (editorVisible == 2) {
      const newData = {
        code: editorRef2.current.getValue(),
      };
    } else if (editorVisible == 3) {
      const newData = {
        code: editorRef3.current.getValue(),
      };
    }

    try {
      saveData();
      const response = await axios.get("http://localhost:8000/api/results/", {
        params: { code: editorRef1.current.getValue() },
      });
      console.log("response >>", response);
      setResult(response["data"]);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  useEffect(() => {
    // do conditional chaining
    monaco?.languages.typescript.javascriptDefaults.setEagerModelSync(true);
    // or make sure that it exists by other ways
    if (monaco) {
      console.log("here is the monaco instance:", monaco);
    }
  }, [monaco]);

  const saveData = async () => {
    const newData = {
      user_id: user_id,
      question: question_no,
      save1: editorRef1.current.getValue(),
      save2: editorRef2.current.getValue(),
      save3: editorRef3.current.getValue(),
    };
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

  const saveData2 = async () => {
    const newData = {
      user_id: user_id,
    };
    try {
      const response = await axios.get("http://localhost:8000/api/userdata/", {
        params: 0,
      });
      console.log("response >>", response);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  const onReset1 = () => {
    setCode1("#some comment");
    console.log(editorRef1.current.getValue());
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
      console.log(text);
      await navigator.clipboard.writeText(text);
    } catch (error) {
      alert("복사 실패!");
    }
  };

  const excuteResultDisplay = () => {};
  const submitResultDisplay = () => {};

  const submit = async () => {
    saveData();
    setOriginal();
    setModified();
    setEditorVisible(4);
  };

  return (
    <div className="desktop13">
      <div className="header" />
      <ul
        className="problemname"
        onClick={(e) => setDropdownVisibility(!dropdownVisibility)}
      >
        week1 : 피보나치 수{dropdownVisibility ? " △" : " ▽"}
      </ul>
      <Dropdown visibility={dropdownVisibility}>
        <Dropdownlist />
      </Dropdown>
      <div className="section_left">
        <div className="section1" />
        <div className="line1" />
        <dlv className="line2" />
        <div className="line3" />
        <div className="question_title1">문제</div>
        <div className="question_content1">{now.problem}</div>
        <div className="line4" />
        <div className="question_title2">참조 / 제약사항</div>
        <div className="question_content2">{now.constraint}</div>
        <div className="section2" />
        <div className="testcase_title">테스트케이스</div>
        <div className="line5" />
        <div className="testcase_content">{now.testcase}</div>
      </div>

      <div
        className="editor"
        css={css`
          background-color: red;
        `}
      >
        <div className="editor_header">
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
          <button className="saveBtn" onClick={saveData}>
            저장
          </button>
          <button className="runBtn" onClick={showValue}>
            실행
          </button>
          <button className="evalBtn">채점</button>
          <button className="submitBtn" onClick={submit}>
            제출
          </button>
        </div>
        <div className="onlyEditors">
          <div
            css={
              editorVisible == 1
                ? css`
                    display: block;
                  `
                : css`
                    display: none;
                  `
            }
          >
            <Editor
              id="Editor1"
              value={code1}
              height="60vh"
              width="130vh"
              theme="myTheme"
              defaultLanguage="python"
              defaultValue="# some comment"
              onMount={handleEditor1DidMount}
              onValidate={handleEditorValidation}
            />
            <button onClick={showValue}>Show value</button> 자동으로 저장됩니다.
            <input
              type="file"
              onChange={(e) => handleChangeFile1(e.target.files[0])}
              accept=".py"
            />
            <button onClick={onReset1}>reset</button>
            <button
              onClick={() => handleCopyClipBoard(editorRef1.current.getValue())}
            >
              copy
            </button>
            <button
              onClick={() => {
                saveFile(editorRef1.current.getValue(), "code1.py");
              }}
            >
              download
            </button>
          </div>
          <div
            css={
              editorVisible == 2
                ? css`
                    display: block;
                  `
                : css`
                    display: none;
                  `
            }
          >
            <Editor
              value={code2}
              height="60vh"
              width="130vh"
              theme="myTheme"
              defaultLanguage="python"
              defaultValue="# some comment"
              onMount={handleEditor2DidMount}
            />
            <button onClick={showValue}>Show value</button> 자동으로 저장됩니다.
            <input
              type="file"
              onChange={(e) => handleChangeFile2(e.target.files[0])}
              accept=".py"
            />
            <button onClick={onReset2}>reset</button>
            <button
              onClick={() => handleCopyClipBoard(editorRef2.current.getValue())}
            >
              copy
            </button>
            <button
              onClick={() => {
                saveFile(editorRef2.current.getValue(), "code2.py");
              }}
            >
              download
            </button>
          </div>
          <div
            css={
              editorVisible == 3
                ? css`
                    display: block;
                  `
                : css`
                    display: none;
                  `
            }
          >
            <Editor
              value={code3}
              height="60vh"
              width="130vh"
              theme="myTheme"
              defaultLanguage="python"
              defaultValue="# some comment"
              onMount={handleEditor3DidMount}
            />
            <button onClick={showValue}>Show value</button> 자동으로 저장됩니다.
            <input
              type="file"
              onChange={(e) => handleChangeFile3(e.target.files[0])}
              accept=".py"
            />
            <button onClick={onReset3}>reset</button>
            <button
              onClick={() => handleCopyClipBoard(editorRef3.current.getValue())}
            >
              copy
            </button>
            <button
              onClick={() => {
                saveFile(editorRef3.current.getValue(), "code3.py");
              }}
            >
              download
            </button>
          </div>
          <div
            css={
              editorVisible == 4
                ? css`
                    display: block;
                  `
                : css`
                    display: none;
                  `
            }
          >
            <DiffEditor
              height="60vh"
              width="130vh"
              theme="myTheme"
              defaultLanguage="python"
              original={original_code}
              modified={modified_code}
              onMount={handleDiffEditorDidMount}
              readOnly={true}
            />
          </div>
        </div>
        <div
          className="terminal"
          css={css`
            background-color: blue;
          `}
        >
          <div className="terminal_header">
            <button className="resultBtn1" onClick={() => setResultShow(0)}>
              실행결과
            </button>
            <button className="resultBtn2" onClick={() => setResultShow(1)}>
              제출결과
            </button>
            <button className="resultBtn3" onClick={() => setResultShow(1)}>
              테스트케이스
            </button>
            <button className="resultBtn4" onClick={() => setResultShow(2)}>
              코드분석
            </button>
            <div className="result_window">
              <div
                css={
                  resultShow == 0
                    ? css`
                        display: block;
                      `
                    : css`
                        display: none;
                      `
                }
              >
                <textarea value={result} disabled="True" cols="145" rows="15" />
              </div>
              <div
                css={
                  resultShow == 1
                    ? css`
                        display: block;
                      `
                    : css`
                        display: none;
                      `
                }
              >
                <textarea value={result} disabled="True" cols="145" rows="15" />
              </div>
              <div
                css={
                  resultShow == 2
                    ? css`
                        display: flex;
                        flex-direction: column;
                      `
                    : css`
                        display: none;
                      `
                }
              >
                <textarea
                  value="코드 분석"
                  disabled="True"
                  cols="145"
                  rows="15"
                />
                <button>분석하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

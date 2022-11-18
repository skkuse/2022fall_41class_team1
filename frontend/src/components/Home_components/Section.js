import React, { useState, useRef, useEffect} from "react";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import Editor, {useMonaco} from "@monaco-editor/react";
import PythonEditor from "./PythonEditor";
import Problem from "./Problem";
import axios from "axios";

function Section(){
  const [editorVisible,setEditorVisible]=useState(1);
  const [user_id,setUser_id]=useState(1234);
  const [question_no,setQuestion_no]=useState(1);
  const [code1, setCode1] = useState("#some comment");
  const [code2, setCode2] = useState("#some comment");
  const [code3, setCode3] = useState("#some comment");
  const [result, setResult] = useState("result display");

   const editorRef1 = useRef(null);
   const editorRef2 = useRef(null);
   const editorRef3 = useRef(null);
  const monaco = useMonaco();


  function handleEditor1DidMount(editor, monaco) {
    editorRef1.current = editor;
    editorRef1.current.onDidChangeModelContent(() => {setCode1(editorRef1.current.getValue())})
  }
  function handleEditor2DidMount(editor, monaco) {
    editorRef2.current = editor;
    editorRef2.current.onDidChangeModelContent(() => {setCode1(editorRef2.current.getValue())})
  }
  function handleEditor3DidMount(editor, monaco) {
    editorRef3.current = editor;
    editorRef3.current.onDidChangeModelContent(() => {setCode1(editorRef3.current.getValue())})
  }


  const showValue = async() => {
    const newData={
    "code": editorRef1.current.getValue(),
    };
    try {
    saveData()
    const response = await axios.get('http://localhost:8000/api/results/',{params: {code: editorRef1.current.getValue()}});
    console.log("response >>", response);
    setResult(response['data'])
    } catch(err) {
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

  const saveData = async()=>{
    const newData={
     "user_id": user_id,
    "question": question_no,
    "save1": editorRef1.current.getValue(),
    "save2": editorRef2.current.getValue(),
    "save3": editorRef3.current.getValue(),
    };
    try {
    const response = await axios.post('http://localhost:8000/api/userdata/',newData);
    console.log("response >>", response);
    } catch(err) {
      console.log("Error >>", err);
    }
  }
  const onReset1 = () => {
    setCode1("# some comment");
  }
  const onReset2 = () => {
    setCode2("# some comment");
  }
  const onReset3 = () => {
    setCode3("# some comment");
  }

  const handleChangeFile1 = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = (e) => {
      const content = e.target.result;
      setCode1(content);
    }
    fileData.readAsText(file);
  }
  const handleChangeFile2 = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = (e) => {
      const content = e.target.result;
      setCode2(content);
    }
    fileData.readAsText(file);
  }
  const handleChangeFile3 = (file) => {
    let fileData = new FileReader();
    fileData.onloadend = (e) => {
      const content = e.target.result;
      setCode3(content);
    }
    fileData.readAsText(file);
  }
  
  const saveFile = (str, filename) => {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURI(str);
    hiddenElement.target = '_blank';
    hiddenElement.download = filename;
    hiddenElement.click();
  }

  const handleCopyClipBoard = async (text) => {
    try {
      console.log(text);
      await navigator.clipboard.writeText(text);
    } catch (error) {
      alert('복사 실패!');
    }
  }

  return (
    <>
      <div css={flexBox}>
        <div css={splitStyle}>
          <Problem />
            <div css={editorWrapper}>
              <div css={onlyButtons}>
                <button onClick={()=>{
                    setEditorVisible(3)
                    }}
                >3</button>
                <button onClick={()=>{
                    setEditorVisible(2)
                    }}
                >2</button>
                <button onClick={()=>{
                    setEditorVisible(1)
                    }}
                >1</button>
                <button onClick={saveData}> save</button>

              </div>
              <div css={onlyEditors}>
                <div css={editorVisible==1?visible:unvisible}>
                  <Editor
                    id = "Editor1"
                    value={code1}
                    height="80vh"
                    width="90vh"
                    defaultLanguage="python"
                    defaultValue="# some comment"
                    onMount={handleEditor1DidMount}
                  />
                  <button onClick={showValue}>Show value</button> 자동으로 저장됩니다.
                  <input type="file" onChange={e => handleChangeFile1(e.target.files[0])} accept = ".py"/>
                  <button onClick={onReset1}>reset</button>
                  <button onClick={() => handleCopyClipBoard(editorRef1.current.getValue())}>copy</button>
                  <button onClick ={()=>{saveFile(editorRef1.current.getValue(), "code1.py")}}>download</button>
                </div>
                <div css={editorVisible==2?visible:unvisible}>
                  <Editor
                    value={code2}
                    height="80vh"
                    width="90vh"
                    defaultLanguage="python"
                    defaultValue="# some comment"
                    onMount={handleEditor2DidMount}
                  />
                  <button onClick={showValue}>Show value</button> 자동으로 저장됩니다.
                  <input type="file" onChange={e => handleChangeFile2(e.target.files[0])} accept = ".py"/>
                  <button onClick={onReset2}>reset</button>
                  <button onClick={() => handleCopyClipBoard(editorRef2.current.getValue())}>copy</button>
                  <button onClick ={()=>{saveFile(editorRef2.current.getValue(), "code2.py")}}>download</button>
                </div>
                <div css={editorVisible==3?visible:unvisible}>
                  <Editor
                    value={code3}
                    height="80vh"
                    width="90vh"
                    defaultLanguage="python"
                    defaultValue="# some comment"
                    onMount={handleEditor3DidMount}
                  />
                  <button onClick={showValue}>Show value</button> 자동으로 저장됩니다.
                  <input type="file" onChange={e => handleChangeFile3(e.target.files[0])} accept = ".py"/>
                  <button onClick={onReset3}>reset</button>
                  <button onClick={() => handleCopyClipBoard(editorRef3.current.getValue())}>copy</button>
                  <button onClick ={()=>{saveFile(editorRef3.current.getValue(), "code3.py")}}>download</button>
                </div>
              </div>
            </div>
          <textarea value={result} disabled='True' cols="40" rows="33">
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

const editorWrapper= css`
  display: flex;
  height: 100%;

  /* position: absolute; */

  flex-direction: column;
  left: 0px;
  right: 0px;
`;

const onlyEditors = css`
  flex: 1 1 0%;
  display: flex;
  width: 100%;
  /* position: absolute; */

  flex-direction: row;
  left: 0px;
  right: 0px;
`;

const onlyButtons = css`
  flex: 1 1 0%;
  display: flex;
  width: 100%;
  /* position: absolute; */

  flex-direction: row-reverse;
  left: 0px;
  right: 0px;
`;

const visible = css`
  display: block;

`;
const unvisible = css`
  display: none;

`;

export default Section;

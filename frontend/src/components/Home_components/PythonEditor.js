import React, { useRef,useEffect} from "react";
import ReactDOM from "react-dom";

import Editor, {useMonaco} from "@monaco-editor/react";

import axios from "axios";


function PythonEditor() {
  const editorRef = useRef(null);
  const monaco=useMonaco();



  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  // 현재 editor에 있는 코드 실행 함수
  // 현재 아이디, 코드, 문제 저장하는 함수는 따로 만들도록!
  const showValue=async() => {
    const newData={
    //"user_id": 123456,
    //"question": 1,
    //"save1": "print(\"hello\")",
    //"save2": "print(\"hello\")",
    //"save3": "print(\"hello\")",
    save1 : editorRef.current.getValue()
    };
    try {
    const response = await axios.get('http://localhost:8000/api/userdata/123456/1/results/',{params:newData})
    console.log("response >>", response);
    console.log(response.data.save1);
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


  return (
   <div class="editor_wrapper">
     <Editor
       height="80vh"
       width="90vh"
       defaultLanguage="python"
       defaultValue="// some comment"
       onMount={handleEditorDidMount}
     />
     <button onClick={showValue}>Show value</button>
   </div>
  );
};

export default PythonEditor;

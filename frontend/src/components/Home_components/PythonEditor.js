import React, { useState, useRef,useEffect} from "react";
import ReactDOM from "react-dom";

import Editor, {useMonaco} from "@monaco-editor/react";

import axios from "axios";


function PythonEditor() {
  const editorRef = useRef(null);
  const monaco=useMonaco();



  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const showValue=async() => {
    const newData={
     "user_id": 12123,
    "question": 1,
    "save1": editorRef.current.getValue(),
    "save2": "print(\"hello\")",
    "save3": "print(\"hello\")",
    };
    try {
    const response = await axios.post('http://localhost:8000/api/userdata/',newData);
    console.log("response >>", response);
  } catch(err) {
    console.log("Error >>", err);
  }
  };

  const showValue2=async() => {
    const newData={
//    "user_id": 12123,
//    "question": 1,
//    "save1": editorRef.current.getValue(),
//    "save2": "print(\"hello\")",
//    "save3": "print(\"hello\")",
      "user_id": 123444,
      "user_name": editorRef.current.getValue(),
      "user_pwd": 1234,
      "user_type": 1,
      "user_email": "asdf@asdf.conm",
      "user_org": "asdf"
    };
    try {
    const response = await axios.post('http://localhost:8000/api/user/',newData);
    console.log("response >>", response);
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
     <button onClick={showValue2}>Show value</button>
   </div>
  );
};

export default PythonEditor;

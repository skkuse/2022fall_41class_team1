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

  const showValue=async() => {

    try {
    const response = await axios.post('http://localhost:8000/api/userdata/',{

    "User_id": 12345,
    "Question": 1,
    "Save1": "print(\"hello\")",
    "Save2": "",
    "Save3": "",

    })
    console.log("response >>", response)
  } catch(err) {
    console.log("Error >>", err);
  }
  }


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
}

export default PythonEditor;

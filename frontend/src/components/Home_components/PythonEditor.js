import React, { useRef,useEffect} from "react";
import ReactDOM from "react-dom";

import Editor, {useMonaco} from "@monaco-editor/react";



function PythonEditor() {
  const editorRef = useRef(null);
  const monaco=useMonaco();



  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function showValue() {
    alert(editorRef.current.getValue());
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

import React from "react";
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";



function PythonEditor() {

  function handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
  }
    return (
    <div class="wrapper">
      <Editor
  height='90vh'
  width='80vh'
  theme="vs-dark"
  defaultValue='--여기에 Python문을 작성하시면 됩니다.'
  language='python'
  theme='tomorrow'
  onChange={handleEditorChange}
  options={{
    fontSize: 15,
    minimap: { enabled: false },
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto'
    }
  }}
/>
</div>
    );

}

export default PythonEditor;

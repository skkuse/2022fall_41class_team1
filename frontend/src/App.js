import React, { Component, Fragment } from "react";

import styles from "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Editor from "@monaco-editor/react";
import Problem from "./components/Problem"
import PythonEditor from './components/PythonEditor'

class App extends Component {
  render() {
    return (
       <body>
        <Header />
        <div class="wrapper">
        <Problem />
        <PythonEditor />
        <Home />
        </div>
       </body>
    );
  }
}



export default App;

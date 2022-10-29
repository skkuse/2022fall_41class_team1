import React from "react";
import {Reset} from "styled-reset";
import Header from "../components/Home/Header";
import PythonEditor from "../components/Home/PythonEditor";
import Problem from "../components/Home/Problem";
import styles from "./Home.css";

function Home() {
    return (
      <>
      <Reset />
      <body>
        <Header />
        <div>
          <Problem />
          <PythonEditor />
          <div class="Home_wrapper">
          <textarea disabled='True' cols="40">
          resultresultresult
          </textarea>
          </div>
        </div>
      </body>
      </>
    );
}

export default Home;

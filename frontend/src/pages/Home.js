import React from "react";
import { Reset } from "styled-reset";
import Header from "../components/Home_components/Header";
import Section from "../components/Home_components/Section";
/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";




const Home = () => {
    return (
      <>
      <Reset />
        <Header />
        <Section />
      </>
    );
}

export default Home;

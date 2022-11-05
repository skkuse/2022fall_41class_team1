import React, { Component, Fragment } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage1 from "./pages/RegisterPage1";
import RegisterPage2 from "./pages/RegisterPage2";
import RegisterPage3 from "./pages/RegisterPage3";
import AddPage from "./pages/AddPage";
import FindPage1 from "./pages/FindPage1";
import FindPage2 from "./pages/FindPage2";

class App extends Component {
    render(){
    return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register1" element={<RegisterPage1 />} />
      <Route path="/register2" element={<RegisterPage2 />} />
      <Route path="/register3" element={<RegisterPage3 />} />
      <Route path="/add" element={<AddPage />} />
      <Route path="/find1" element={<FindPage1 />} />
      <Route path="/find2" element={<FindPage2 />} />
    </Routes>
    );
  }
}

export default App;

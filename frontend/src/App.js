import React, { Component, Fragment } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddPage from "./pages/AddPage";

function App() {
    return (
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/add" element={<AddPage />} />
    </Routes>
    );
  }


export default App;

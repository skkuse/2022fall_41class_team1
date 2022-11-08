import React from 'react';
import { StrictMode } from "react";
import ReactDOM from 'react-dom';
import App from './App';
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
  </StrictMode>
  ,
  rootElement
  );

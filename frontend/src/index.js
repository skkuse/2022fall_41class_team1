import React from 'react';
import { StrictMode } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
  </StrictMode>,
  rootElement
  );

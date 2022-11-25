import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NowProvider } from "./context/NowContext";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import reduxThunk from "redux-thunk";
import reducer from "./_reducers";

const rootElement = document.getElementById("root");
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware, reduxThunk)(createStore);

ReactDOM.render(
  <StrictMode>
    <NowProvider>
      <Provider
        store={createStoreWithMiddleware(
          reducer,
          // 개발자 도구를 사용하기 위한 설정
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </NowProvider>
  </StrictMode>,
  rootElement
);
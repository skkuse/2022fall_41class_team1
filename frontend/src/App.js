import React, { useEffect } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import { loginCheck } from "./_actions/changeStatus";
import { useSelector, useDispatch } from "react-redux";
import rootReducer from "./_reducers/index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterPage1 from "./pages/RegisterPage1";
import RegisterPage2 from "./pages/RegisterPage2";
import RegisterPage3 from "./pages/RegisterPage3";
//import AddPage from "./pages/AddPage";
import FindPage1 from "./pages/FindPage1";
import FindPage2 from "./pages/FindPage2";
import StartPage from "./pages/StartPage";

function App() {
    const dispatch = useDispatch();
    const isLogin = useSelector((state) => state.changeStatus.isLogin);
    const localstorageCheck = localStorage.getItem('access_token');

    useEffect(() => {
      if (localstorageCheck) {
        dispatch(loginCheck());
      }
    }, []);

    return (
    <Routes>
      <Route exact path="/" element={<StartPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register1" element={<RegisterPage1 />} />
      <Route path="/register2" element={<RegisterPage2 />} />
      <Route path="/register3" element={<RegisterPage3 />} />

      <Route path="/find1" element={<FindPage1 />} />
      <Route path="/find2" element={<FindPage2 />} />
    </Routes>
    );
    //<Route path="/add" element={<AddPage />} />

}

export default App;
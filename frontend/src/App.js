import React, { useEffect } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import { loginCheck } from "./_actions/changeStatus";
import { useSelector, useDispatch } from "react-redux";
import rootReducer from "./_reducers/index";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import AddPage from "./pages/AddPage";
import Start from "./pages/Start";
import SubjectPage from "./pages/SubjectPage";

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
      <Route exact path="/" element={<Start />} />
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route exact path="/subject" element={<SubjectPage />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    );
    //<Route path="/add" element={<AddPage />} />

}

export default App;
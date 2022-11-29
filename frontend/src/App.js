<<<<<<< HEAD
import React, { useEffect } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import { loginCheck } from "./_actions/changeStatus";
import { useSelector, useDispatch } from "react-redux";
import rootReducer from "./_reducers/index";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import AddPage from "./pages/AddPage";
import FindPage1 from "./pages/FindPage1";
import FindPage2 from "./pages/FindPage2";
import Start from "./pages/Start";

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
      <Route path="/register" element={<Register />} />

      <Route path="/find1" element={<FindPage1 />} />
      <Route path="/find2" element={<FindPage2 />} />
    </Routes>
    );
    //<Route path="/add" element={<AddPage />} />

}

=======
import React, { useEffect } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import { loginCheck } from "./_actions/changeStatus";
import { useSelector, useDispatch } from "react-redux";
import rootReducer from "./_reducers/index";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import AddPage from "./pages/AddPage";
import FindPage1 from "./pages/FindPage1";
import FindPage2 from "./pages/FindPage2";
import Start from "./pages/Start";

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
      <Route path="/register" element={<Register />} />

      <Route path="/find1" element={<FindPage1 />} />
      <Route path="/find2" element={<FindPage2 />} />
    </Routes>
    );
    //<Route path="/add" element={<AddPage />} />

}

>>>>>>> b71e8bd3c7d48e401a6543aef7b9253bc6411713
export default App;
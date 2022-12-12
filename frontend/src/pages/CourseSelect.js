/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";
import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import {baseURL} from '../utils/axios';
import Logo from "../assets/Logo.png";
import { useNavigate, useLocation, Link } from "react-router-dom";


const CourseSelect = () => {
    const {state} = useLocation();
    const [logAccount, setLogAccount] = useState({
        user_email: state.user_email,
        user_course: null,
      });
    const [user_id, setUser_id] = useState();
    const navigate = useNavigate();
    const [courselist, setCourselist] = useState([]);
    const [dropdownVisibility, setDropdownVisibility] = useState(false);
    const [course, setCourse] = useState();

    const getAllCourse = async () => {
        try {
            console.log('email is : ', logAccount.user_email)
          const response = await axios.get("http://localhost:8000/main/testtest/", {
            params:{
            user_id: logAccount.user_email,
          }});
          console.log("response >>", response.data);
          setCourselist(response.data);
        } catch (error) {
          console.log("Error >>", error);
        }
    }

    useEffect(() => {
        getAllCourse();
    }, []);
    
    
    const Dropdown = (props) => {
        return(
          <article>
            { props.visibility && props.children }
          </article>
        );
    }

    function Dropdownlist (props) {
        return (
        <ul css={dropdownul}>
            {courselist.map((item) => {
            return <li css={dropdownli} onClick={() => setLogAccount({user_email: state.user_email, user_course: item})}> {item} </li>
            })}
        </ul> 
        );
    }

    const click_start = () => {
        navigate("/Main",{state: logAccount});
    }

    return (
        <div className="desktop5">
            <img src={Logo} alt="codingtest" className="logo"></img>
            <div className="container">
                <div className="select">
                    <ul
                        css={css`position: relative; color: black; background-color: white; z-index: 2; width: 300px; height: 50px;`} 
                        onClick={(e) => setDropdownVisibility(!dropdownVisibility)}
                    >
                    {logAccount.user_course}{dropdownVisibility ? " △" : " ▽"}
                    </ul>
                    <Dropdown visibility={dropdownVisibility}>
                        <Dropdownlist />
                    </Dropdown>
                </div>
                <button className="startBtn" onClick = {click_start}>시작하기</button>
            </div>
        </div>
    );
};


export default CourseSelect;



const dropdownul = css`
  position: absolute;
  color: black;
  background-color: white;
  z-index: 2;
  width: 300px;
`;
const dropdownli = css`
  color: black;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
`;
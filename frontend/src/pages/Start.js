import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Start.css";
import Logo from "../assets/Logo.png"

const Start = () => {
  const navigate = useNavigate();

  const onDesktop1Click = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="desktop1" onClick={onDesktop1Click}>
      <img src={Logo} alt="codingtest" className="logo"></img>
      <div className="start">Click anywhere...</div>
    </div>
  );
};

export default Start;

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Start.css";

const Start = () => {
  const navigate = useNavigate();

  const onDesktop1Click = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="desktop1" onClick={onDesktop1Click}>
      <div className="title1">CODING TEST</div>
      <div className="title2">CODING TEST</div>
      <div className="start">Click anywhere...</div>
    </div>
  );
};

export default Start;

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StartPage.css";

const StartPage = () => {
  const navigate = useNavigate();

  const onDesktop1Click = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="desktop1" onClick={onDesktop1Click}>
      <div className="codingTestDiv">
        <div className="codingTestDiv1">coding test</div>
      </div>
    </div>
  );
};

export default StartPage;

import { useCallback, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Start.css";
import mario from "../audios/mario.mp3";
import { Howl } from "howler";

const Start = () => {
  const navigate = useNavigate();

  const onDesktop1Click = () => {
    sound.play('mario');
    navigate("/login");
  };

  const sound = new Howl({
    src: mario,
    sprite: {
      mario: [2000, 10000]
    }
  });
  
  

  return (
    <div className="desktop1" onClick={onDesktop1Click}>
      <div className="title_box">
        <div className="title1">CODING TEST</div>
        <div className="title2">CODING TEST</div>
      </div>
      <div className="start">Click anywhere...</div>
    </div>
  );
};

export default Start;

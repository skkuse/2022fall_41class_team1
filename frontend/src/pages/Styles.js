// Styles.js
import styled from 'styled-components';

export const Background = styled.div`
   position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  color: black;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity:50%;
`;

export const LoadingText = styled.div`
  font: 1rem 'Noto Sans KR';
  text-align: center;
`;
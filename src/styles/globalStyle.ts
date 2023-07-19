import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}

#root {
  width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100vh;
    padding: 0.5rem min(5vw, 5rem);
}

body{
  font-family:'Nunito Sans', sans-serif;
  font-size: clamp(1em, 1em + 1vw, 16px);
  --webkit-font-smoothing: antialiased;  
  background-color: #fff;
  color: #000;
  

  @media(max-width: 768px){
    font-size: 14px;
  }

  @media(max-width: 400px){
    font-size: 12px;
  }
}
`;
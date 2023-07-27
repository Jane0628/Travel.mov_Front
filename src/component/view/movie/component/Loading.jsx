import { Image } from "react-bootstrap";
import styled from "styled-components"

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  position: relative;
  
  @keyframes loading {
    0% {
      transform: translate(-50%, -50%) rotateZ(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotateZ(360deg);
    }
  }

  img {
    width: 150px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    &#text {
      transform-origin: 50% 58%;
      animation: loading 1s infinite;
    }
  }
    
   
`;
export default function Loading() {

  return (
    <LoadingWrapper>
      <Image src={require("../../../../img/loading_img_1.png")} />
      <Image id="text" src={require("../../../../img/loading_img_2.png")} />
    </LoadingWrapper>
  )
}
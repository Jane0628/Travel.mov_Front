import styled from "styled-components"

const LoadingWrapper = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    
    @keyframes loading {
        0 {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(0, 15px);
          }
          100% {
            transform: translate(0, 0);
          }
    }
    
    .circle {
        margin: 10px;
        width: 20px;
        height: 20px;
        background-color: crimson;
        border-radius: 50%;
        animation: loading 1s infinite;
        
        &:nth-child(2) {
            animation-delay: .2s;
        }
        &:nth-child(3) {
            animation-delay: .4s;
        }
    }
`;
export default function Loading() {

    return (
        <LoadingWrapper>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
        </LoadingWrapper>
    )
}
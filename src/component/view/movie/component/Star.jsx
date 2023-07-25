import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
position: relative;
font-size: 16px; //fontawesome icon의 default size는 parent element의 font-size임.
width: 150px;
height: 30px;
display: flex;
align-items: center;

.outer {
  width: 100%;
  position: absolute;
  top:0;
  color: gray;
}
`;

const Inner = styled.div`
    color: yellow;
    overflow:hidden;
    ${width => `width: ${width.width * 8}%;`}
    position: absolute;
    top:0;
    white-space: nowrap;
`;

export default function Star({ vote_average }) {
  const printStar = () => {
    let star = [];
    for (let i = 0; i < 5; i++) {
      star.push(
        <FontAwesomeIcon className="star fa-fw" key={i} icon={faStar} />
      )
    }
    return star;
  }

  return (
    <Wrapper>
      <div className="outer">
        {printStar()}
      </div>
      <Inner className="inner" width={vote_average}>
        {printStar()}
      </Inner>
    </Wrapper>
  )
}
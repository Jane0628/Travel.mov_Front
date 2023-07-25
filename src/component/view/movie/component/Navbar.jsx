import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarWrapper = styled.div`
  
  padding: 10px;
  top:0;
  ul {
    margin:0;
    padding: 4px 0px;
    display: flex;
    list-style: none;
    align-items: center;
    li {
      margin-right: 35px;
      font-size: 18px;
      font-weight: 300;
      &:last-child {
        margin-right: 0px;
      }
    }
    a {
      text-decoration: none;
      color: #424180;
      &:hover {
        color: crimson;
      }
      &:active {
        color: white;
      }
    }
  }
}
`;

export default function Header() {
  return (
    <NavbarWrapper>
      <ul>
        <li className="home"><Link to="/">메인</Link></li>
        <li><Link to="/now_playing">전체 영화</Link></li>
      </ul>
    </NavbarWrapper>
  )
}
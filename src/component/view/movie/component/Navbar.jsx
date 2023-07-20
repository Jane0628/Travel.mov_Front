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
                margin-right: 0px; //되나
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
                <li><Link to="/">Main</Link></li>
                <li className="home"><Link to="/TodaysMovieDetail">Movie Main</Link></li>
                <li><Link to="/now_playing">Now Playing Movie</Link></li>
                {/* <li><Link to="/upcoming">Upcoming Movie</Link></li> */}
            </ul>
        </NavbarWrapper>
    )
}
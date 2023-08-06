import React, { useState } from "react";
import "../../design/layout/header.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Drawer, InputAdornment, TextField, } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Image } from "react-bootstrap";
import HamburgerMenu from "./HamburgerMenu";
import menu from "../../img/menu.png";

const Header = () => {
  const redirection = useNavigate();

  const moveToMainPage = () => {
    redirection("/");
  };

  const [text, setText] = useState("");

  const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
      api_key: process.env.REACT_APP_TMDBAPI_KEY,
    },
  });

  const searchMovie = async (text) => {
    let Data = [];
    try {
      const res = await instance.get(
        `/search/movie?language=ko-KR&page=1&query=${text}`,
        {
          params: {
            region: "KR",
          },
        }
      );
      Data.push(res.data.results);
      return Data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const inputHandler = (e) => {
    setText(e.target.value);
  };

  const searchHandler = async (e) => {
    e.preventDefault();

    const searchData = await searchMovie(text);
    redirection("/search", { state: { searchData } });
  };

  // 햄버거
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (e) => {
    const accordions = document.getElementsByClassName(
      "css-jsoc8j-MuiTypography-root"
    );

    for (let a in accordions) {
      if (e.target === a) {
        return;
      }
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <>
      <header>
        {/* 로고 */}
        <Image
          src={require("../../img/long_logo.png")}
          onClick={moveToMainPage}
        />

        <div className="right">
          {/* 검색 */}
          <form onSubmit={searchHandler} autoComplete="off">
            <TextField
              id="outlined-start-adornment"
              color="secondary"
              sx={{ width: "25ch", height: "50px" }}
              placeholder="영화 제목을 입력하세요."
              onChange={inputHandler}
              value={text}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon onClick={searchHandler} />
                  </InputAdornment>
                ),
              }}
            />
          </form>
          {/* 햄버거 */}
          {["right"].map((anchor) => (
            <>
              <Button onClick={toggleDrawer(anchor, true)}>
                <img src={menu} style={{ height: "20px", width: "20px" }} />
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                <HamburgerMenu anchor />
              </Drawer>
            </>
          ))}
        </div>
      </header>
    </>
  );
};

export default Header;

import React from "react";
import "../../../design/todaysMovie.scss";
import { Link } from "react-router-dom";

const TodaysMovie = () => {
  return (
    <>
      <h1>오늘의 영화</h1>
      <h2 style={{ textAlign: "right", color: "black" }}>
        <Link to="/TodaysMovieDetail" style={{ color: "black" }}>
          영화상세보기 이동
        </Link>
      </h2>
      <div className="information-box">
        <div>
          <img src={require("../../../img/elemental.jpg")} alt="엘리멘탈" />
        </div>
        <div>
          <img src={require("../../../img/mermaid.jpg")} alt="인어공주" />
        </div>
        <div>
          <img src={require("../../../img/elemental.jpg")} alt="엘리멘탈" />
        </div>
        <div>
          <img src={require("../../../img/mermaid.jpg")} alt="인어공주" />
        </div>
        <div>
          <img src={require("../../../img/elemental.jpg")} alt="엘리멘탈" />
        </div>
        <div>
          <img src={require("../../../img/mermaid.jpg")} alt="인어공주" />
        </div>
      </div>
    </>
  );
};

export default TodaysMovie;

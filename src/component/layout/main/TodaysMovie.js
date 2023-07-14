import React from 'react'
import "../../../design/todaysMovie.scss";

const TodaysMovie = () => {
  return (
    <>
      <h1>오늘의 영화</h1>
      <div className='information-box'>
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
  )
}

export default TodaysMovie
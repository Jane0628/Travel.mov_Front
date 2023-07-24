import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiStar } from "react-icons/fi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../design/uploadFreeBoard.scss";
import { API_BASE_URL } from "../../util/host-utils";
import { useNavigate, useParams } from "react-router-dom";
import { getLoginUserInfo } from "../../util/login-utils";

const UploadFreeBoard = () => {
  //url에서 영화 정보 얻어오기
  const movie = useParams();
  const movieId = movie.id;
  const starArr = [1, 2, 3, 4, 5];
  const [hover, setHover] = useState(0);
  const [starNum, setStarNum] = useState(0);
  const redirection = useNavigate();
  const [movieContent, setMovieContent] = useState({
    title: "",
    content: "",
  });
  const token = getLoginUserInfo().token;
  const nick = getLoginUserInfo().username;

  //   const [viewContent, setViewContent] = useState([]);

  const submitReview = async () => {
    console.log(movieContent);
    if (!starNum) {
      alert("별점을 선택해 주세요");
      return;
    }
    if (!movieContent.title) {
      alert("제목을 입력해주세요");
      return;
    }
    if (!movieContent.content) {
      alert("내용을 입력해주세요");
      return;
    }
    console.log(starNum);
    const res = await fetch(`${API_BASE_URL}/freeBoard`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title: movieContent.title,
        content: movieContent.content,
        movie: movieId,
        userNick: nick,
        star: starNum,
      }),
    });

    if (res.status !== 200) {
      const text = await res.text();
      alert(text);
      return;
    }
    if (res.status === 200) {
      alert("게시글이 등록되었습니다.");
      redirection(`/freeBoardList/${movieId}`);
    }
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setMovieContent({
      ...movieContent,
      [name]: value,
    });
  };
  return (
    <>
      <div className="App">
        <h1>영화 촬영지 후기</h1>
        {/* <div className="movie-container">
           {viewContent.map((element) => (
            <div>
              <h2>{element.title}</h2>
              <div>{element.content}</div>
            </div>
          ))} 
        </div> */}
        <div className="form-wrapper">
          <Rating>
            {starArr.map((idx) => (
              <Star
                key={idx}
                onMouseEnter={() => setHover(idx)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setStarNum(idx)}
                fill={
                  starNum
                    ? idx <= starNum
                      ? "#000"
                      : "#E5E5E5"
                    : idx <= hover
                    ? "#000"
                    : "#E5E5E5"
                }
              />
            ))}
          </Rating>
          <input
            className="title-input"
            type="text"
            placeholder="제목"
            onChange={getValue}
            name="title"
          />
          <CKEditor
            editor={ClassicEditor}
            data="<p>Hello from CKEditor 5!</p>"
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
              setMovieContent({
                ...movieContent,
                content: data,
              });
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
          />
        </div>
        <button
          className="submit-button"
          //   onClick={() => {
          //     setViewContent(viewContent.concat({ ...movieContent }));
          //   }}
          onClick={submitReview}
        >
          입력
        </button>
      </div>
    </>
  );
};

export default UploadFreeBoard;

const Rating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Star = styled(FiStar)`
  font-size: 50px;
  color: transparent;
`;

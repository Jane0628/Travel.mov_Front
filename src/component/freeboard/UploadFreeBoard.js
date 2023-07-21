import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../design/uploadFreeBoard.scss";
import { API_BASE_URL } from "../../util/host-utils";
import { useNavigate } from "react-router-dom";
import { getLoginUserInfo } from "../../util/login-utils";

const UploadFreeBoard = () => {
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
    if (!movieContent.title) {
      alert("제목을 입력해주세요");
      return;
    }
    if (!movieContent.content) {
      alert("내용을 입력해주세요");
      return;
    }
    const res = await fetch(`${API_BASE_URL}/freeBoard`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title: movieContent.title,
        content: movieContent.content,
        userNick: nick,
      }),
    });

    if (res.status !== 200) {
      const text = await res.text();
      alert(text);
      return;
    }
    if (res.status === 200) {
      alert("게시글이 등록되었습니다.");
      redirection("/login");
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
        <h1>Movie Review</h1>
        {/* <div className="movie-container">
           {viewContent.map((element) => (
            <div>
              <h2>{element.title}</h2>
              <div>{element.content}</div>
            </div>
          ))} 
        </div> */}
        <div className="form-wrapper">
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
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
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

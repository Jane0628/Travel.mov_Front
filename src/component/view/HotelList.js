import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../util/host-utils";
import { useEffect } from "react";
import { getLoginUserInfo } from "../../util/login-utils";
import { MenuItem, TextField } from "@mui/material";
import Header from "../layout/Header";

const nameList = [
  { name: "전체", value: "전체", key: "전체" },
  { name: "서울", value: "서울", key: "서울" },
  { name: "경기", value: "경기", key: "경기" },
  { name: "강원", value: "강원", key: "강원" },
  { name: "충청", value: "충청", key: "충청" },
  { name: "전라", value: "전라", key: "전라" },
  { name: "경상", value: "경상", key: "경상" },
];

const HotelCarousel = () => {
  const [hotels, setHotels] = useState([]);
  const [name, setName] = useState();
  const token = getLoginUserInfo().token;
  const requestHeader = {
    "content-type": "application/json",
    Authorization: "Bearer " + token,
  };
  useEffect(() => {
    allHotel();
  }, []);

  //모든 호텔 리스트
  const allHotel = () =>
    fetch(`${API_BASE_URL}/hotels`, {
      method: "GET",
      headers: requestHeader,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setHotels(json);
      });

  //호텔 검색 리스트
  const searchHotel = (name) =>
    fetch(`${API_BASE_URL}/hotels/address/${name}`, {
      method: "GET",
      headers: requestHeader,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setHotels(json);
      });

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 6;
  const pageCount = Math.ceil(hotels.length / pageSize);
  const paginatedHotels = hotels.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleChange = (e) => {
    setName(e.target.value);
    if (e.target.value === "전체") {
      allHotel();
      setCurrentPage(0);
      return;
    } else {
      searchHotel(e.target.value);
    }
    setCurrentPage(0);
  };

  return (
    <div>
      <Header />
      <div style={{ margin: 20, marginTop: 100 }}>
        <TextField
          select
          id="demo-simple-select"
          defaultValue="전체"
          value={name}
          label="지역"
          onChange={handleChange}
        >
          {nameList.map((name) => (
            <MenuItem key={name.id} value={name.value}>
              {name.name}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gridGap: "10px",
        }}
      >
        {paginatedHotels.map((hotel) => (
          <div
            key={hotel.id}
            style={{
              height: "500px",
              border: "1px solid #b1bff9",
              margin: "5px 20px",
              borderRadius: "15px",
              padding: "15px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <img
              src={hotel.img}
              alt={hotel.name}
              style={{ width: "100%", height: "225px", objectFit: "cover" }}
            />
            <div style={{ marginTop: "10px", textAlign: "left" }}>
              <h2 style={{ margin: "10px" }}>{hotel.name}</h2>
              <p style={{ margin: "10px" }}>{hotel.address}</p>
              <p style={{ margin: "10px" }}>{hotel.price.toLocaleString()}원</p>
            </div>
            <div style={{ position: "absolute", bottom: "20px" }}>
              {hotel.reservation ? (
                <button
                  style={{
                    marginTop: "auto",
                    padding: "5px 10px",
                    backgroundColor: "#b1bff9",
                    color: "#fff",
                    border: "none",
                    borderRadius: "7px",
                  }}
                >
                  <Link to={`/checkOut/${hotel.id}`} className="out">
                    예약하기
                  </Link>
                </button>
              ) : (
                <button
                  style={{
                    marginTop: "auto",
                    padding: "5px 10px",
                    backgroundColor: "#c0c0c0",
                    color: "#fff",
                    border: "none",
                    borderRadius: "7px",
                  }}
                >
                  <Link className="out">예약완료</Link>
                </button>
              )}
              <button
                style={{
                  marginTop: "auto",
                  marginLeft: 10,
                  padding: "5px 10px",
                  backgroundColor: "#b1bff9",
                  color: "#fff",
                  border: "none",
                  borderRadius: "7px",
                }}
              >
                <Link to={`/freeboardList/${hotel.id}`} className="out">
                  후기보기
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          style={{
            marginRight: "10px",
            padding: "5px 10px",
            backgroundColor: "#b1bff9",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          이전
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === pageCount - 1}
          style={{
            marginTop: "auto",
            padding: "5px 10px",
            backgroundColor: "#b1bff9",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default HotelCarousel;

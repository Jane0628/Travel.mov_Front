import React, { useEffect, useState } from 'react';
import { getLoginUserInfo } from "../../util/login-utils";
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from "../../util/host-utils";

const ChosenHotel = () => {
	const [hotels, setHotels] = useState([]);
	const hotel = location.state?.hotelName || "";
	const redirection = useNavigate();

	const token = getLoginUserInfo().token;
	const requestHeader = {
		"content-type": "application/json",
		Authorization: "Bearer " + token,
	};

	useEffect(() => {
		fetch(`${API_BASE_URL}/hotels/name/${hotel}`, {
			method: "GET",
			headers: requestHeader,
		})
			.then((res) => {
				if (res.status === 200) return res.json();
				else if (res.status === 403) {
					alert("로그인이 필요한 서비스입니다.");
					redirection("/login");
					return;
				} else {
					alert(res.text);
					redirection("/hotels");
				}
				return;
			})
			.then((json) => {
				console.log(json);
				setHotels(json);
			});
	}, []);

	return (
		<div
			key={hotel.id}
			style={{
				border: "1px solid #b1bff9",
				margin: "5px 20px",
				borderRadius: "15px",
				padding: "15px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
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
				<p style={{ margin: "10px" }}>{hotel.price}원</p>
			</div>
			<div>
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
	)
}

export default ChosenHotel
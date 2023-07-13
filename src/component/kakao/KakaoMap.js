// import React, { useEffect, useState } from 'react'
// import { Map, MapMarker } from 'react-kakao-maps-sdk'

// const KakaoMap = () => {
  
//   const [info, setInfo] = useState();
//   const [markers, setMarkers] = useState([]);
//   const [map, setMap] = useState();

//   const [position, setPosittion] = useState(
//     new kakao.maps.LatLng(37.5592, 126.9427)
//   );

//   useEffect(() => {
//     if (!map) return;
//     const ps = new kakao.maps.services.Places();

//     ps.keywordSearch("호텔", (data, status, _pagination) => {
//       if (status === kakao.maps.services.Status.OK) {
//         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//         // LatLngBounds 객체에 좌표를 추가합니다
//         const bounds = new kakao.maps.LatLngBounds();
//         let markers = [];


//         for (let i = 0; i < data.length; i++) {
//           // @ts-ignore
//           markers.push({
//             position: {
//               lat: data[i].y,
//               lng: data[i].x,
//             },
//             content: data[i].place_name,
//           })
//           // @ts-ignore
//           bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
//         }
//         setMarkers(markers);

//         // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//         map.setBounds(bounds);
//       }
//     }, {
//       location: position,
//       radius: 10000,
//       sort: kakao.maps.services.SortBy.DISTANCE,
//     });

    
//   }, [map]);

//   return (
//     <Map // 로드뷰를 표시할 Container
//       center={{
//         lat: 37.5592,
//         lng: 126.9427,
//       }}
//       style={{
//         width: "100%",
//         height: "350px",
//       }}
//       level={3}
//       onCreate={setMap}
//     >
//       {markers.map((marker) => (
//         <MapMarker
//           key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
//           position={marker.position}
//           onClick={() => setInfo(marker)}
//         >
//           {info &&info.content === marker.content && (
//             <div style={{color:"#000"}}>{marker.content}</div>
//           )}
//         </MapMarker>
//       ))}
//     </Map>
//   );

// }

// export default KakaoMap
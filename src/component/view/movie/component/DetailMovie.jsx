import { useEffect, useState } from "react";
import GooMap from "../../../google/GooMap";
import Star from "../component/Star";
import styled from "styled-components";
import { Button } from "@mui/base";

const DetailMovieWrapper = styled.div`
  position: relative;
  width: 70%;
  height: auto;
  margin: auto;
  padding: 7%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .movie {
    display: flex;
    flex-wrap: nowrap;
    align-items: start;
    height: 700px;
    margin: 0;
    
    img {
      height: 700px;
      margin: auto 0;
    }
  }
  
  button {
    margin-top: 50px;
  }
`;

const Description = styled.div`
    background-color: rgba( 255, 255, 255, 0.1 );
    margin-left: 50px;
    display: flex;
    flex-direction: column;
  
    >div{
      margin-top: 18px;
    }
    
    .title {
      margin: 0;
      font-size: 55px;
    }

    .genres { 
      display: flex;
      font-size: 14px;
      margin: 0;
      
      .genre {
        color: white;
        padding: 5px 10px;
        margin-right: 7px;
        background-color: #7b8ce0;
        border-radius: 5px;

        &:last-child{
          margin-right: 0;
        }
      }
    }
    
    .sub-info{
        font-size: 16px;
        display: flex;
        word-break: keep-all;
        margin: 0;
        
        >div::after{
            content: "";
            padding: 7px;
          }
        }

        .release-date{
          overflow: nowrap;
          margin: 10px 0;
        }

        .vote-average {
          display: flex;
          align-items: center;
          margin: 0;

          >div:last-child {
            margin-left: 15px;
          }
        }
    }

    .overviewInfo {
      .tagline{
        border-top: 1px solid #7b8ce0;
        font-size: 25px;
        margin-bottom: 3px;
        padding-top: 20px;
      }

      .overview{
        font-size: 20px;
        font-weight: 300;
        word-break: keep-all;
      }
    }

    .companies {
      font-size: 17px;

      .company {
        margin-bottom: 15px;

        img {
          object-fit: contain;
          max-width:120px;
          max-height:50px;
        }
      }
    }
`;

const MapContainer = styled.div`
`;

export default function DetailMovie({ movieInfo, imageUrl }) {
  const { poster_path, title, genres, imdb_id, release_date, vote_average, tagline, overview } = movieInfo;
  const [locations, setLocations] = useState([]);
  const [gooLocation, setGooLocation] = useState('');
  const [showMap, setShowMap] = useState(false); // 지도 표시 여부 상태 추가

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {

    const url = 'https://imdb8.p.rapidapi.com/title/get-filming-locations?tconst=' + imdb_id;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_X_RAPIDAPI_KEY}`,
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      if (result && result.locations) {
        // Extracting the location strings from the result and setting it to the 'locations' state.
        const locationNames = result.locations.map((location) => location.location);
        setLocations(locationNames);
      }
    } catch (error) {
      console.error(error);
    }

  };

  const searchLocation = (e) => {
    setGooLocation(e.target.textContent);
  }

  const toggleMap = () => {
    setShowMap(prevShowMap => !prevShowMap);
  }

  return (
    <DetailMovieWrapper>
      <h1 className="title" style={{ fontSize: '55px' }}>{title}</h1>
      <div className="movie" style={{ position: 'relative' }}>
        {showMap ? (
          <>
            <MapContainer>
              {/* showMap이 true인 경우 지도 표시 */}
              <GooMap location={gooLocation} />
            </MapContainer>
            <Description>
              {
                locations.map((location, index) => (
                  <Button key={index} onClick={searchLocation}>{location}</Button>
                ))
              }
            </Description>
          </>
        ) : (
          <>
            <img className="rounded" src={imageUrl + poster_path} />
            <Description>
              <div className="vote-average">
                <Star vote_average={vote_average} />
                <div>({vote_average} / 10)</div>
              </div>
              <div className="sub-info">
                <div className="release-date">개봉일 : {release_date}</div>
              </div>
              <div className="genres">
                {genres.map(genre =>
                  <div className="genre" key={genre.id}>{genre.name}</div>)}
              </div>
              <div className="overviewInfo">
                <div className="tagline">{tagline ? `"${tagline}"` : ''}</div>
                <div className="overview">{overview}</div>
                {showMap && <GooMap location={gooLocation} />} {/* 지도 표시 여부에 따라 조건부 렌더링 */}
              </div>
            </Description>
          </>
        )}
      </div>
      <Button
        onClick={toggleMap}
        style={{
          width: '180px',
          height: '45px',
          borderRadius: '5px',
          background: '#7b8ce0',
          color: '#ffffff',
          border: '2px solid #7b8ce0',
          zIndex: 1000, // 다른 요소 위에 나타나도록 zIndex 설정
        }}>{showMap ? '영화 정보 보기' : '영화 촬영지 보기'}</Button> {/* 버튼 클릭 시 지도 표시 여부를 토글 */}
    </DetailMovieWrapper>
  )
}
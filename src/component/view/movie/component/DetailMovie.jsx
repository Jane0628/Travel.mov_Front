import Star from "../component/Star";
import styled from "styled-components";

const DetailMovieWrapper = styled.div`
    position: relative;
    display: flex;
    width: 70%;
    height: auto;
    margin: auto;
    padding: 7%;
    img{
        width:300px;
        height: 400px;
        margin: auto 0;
    }
`;
const Description = styled.div`
    background-color: rgba( 255, 255, 255, 0.1 );
    margin-left: 10%;
    display: flex;
    flex-direction: column;
  
    padding: 30px;
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
        
        .genre {
            padding: 5px;
            margin-right: 7px;
            background-color: crimson;
            border-radius: 20px;
            &:last-child{
                margin-right: 0;
            }
        }
    }
    
    .sub-info{
        font-size: 16px;
        display: flex;
        
        >div::after{
            content: "|";
            padding: 7px;
        }
        >div:last-child::after {
            content: "";
        }
        .release-date{
            overflow: nowrap;
        }
        .vote-average {
            display: flex;
            >div{
                margin-left:5px;
            }
        }
    }

    .overviewInfo {
        .tagline{
            font-size: 25px;
            margin-bottom: 3px;
        }
        .overview{
            font-size: 20px;
            font-weight: 300;
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
export default function DetailMovie({ movieInfo, imageUrl }) {
  const { poster_path, title, genres, release_date, runtime, vote_average,
    tagline, overview, production_companies } = movieInfo;

  return (
    <DetailMovieWrapper>
      <img src={imageUrl + poster_path} />
      <Description>
        <h1 className="title">{title}</h1>
        <div className="genres">
          {genres.map(genre =>
            <div className="genre" key={genre.id}>{genre.name}</div>)}</div>
        <div className="sub-info">
          <div className="release-date">{release_date}</div>
          <div>{runtime}</div>
          <div className="vote-average">
            <Star vote_average={vote_average} />
            <div>{vote_average}</div>
          </div>
        </div>
        <div className="overviewInfo">
          <div className="tagline">{tagline ? `"${tagline}"` : ''}</div>
          <div className="overview">{overview}</div>
        </div>
        <div className="companies">
          {production_companies.map(company =>
            <div className="company" key={company.id}>
              <img className="company-logo" src={company.logo_path ? imageUrl + company.logo_path : null} alt="No Image" />
              <div>{company.name}</div>
            </div>
          )}
        </div>
      </Description>
    </DetailMovieWrapper>
  )
}
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "ab3d2e3bd514dc30dfbab5a6de119924"
  },
});

const NowPlayingMovie = async () => {
  let Data = [];
  try {
    for (let i = 1; i < 6; i++) {
      const res = await instance.get("/movie/now_playing?language=ko-KR", {
        params: {
          region: "KR",
          page: i,
        },
      });
      Data.push(res.data.results);
    }
    return Data;
  } catch (error) {
    console.log(error);
  }
};
const TopRatedMovie = async () => {
  let Data = [];
  let totalPage = 1;
  try {
    for (let i = 1; i < totalPage + 1; i++) {
      const res = await instance.get("/movie/top_rated?language=ko-KR", {
        params: {
          region: "KR",
          page: i,
        },
      });
      if (totalPage !== res.data.total_pages) {
        totalPage = res.data.total_pages;
      }
      Data.push(res.data.results);
    }
    return Data;
  } catch (error) {
    console.log(error);
  }
};

const getDetail = async (id) => {
  try {
    const res = await instance.get(`/movie/${id}?language=ko-KR`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export { NowPlayingMovie, TopRatedMovie, getDetail };

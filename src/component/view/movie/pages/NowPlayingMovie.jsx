import { useContext } from "react"
import NowPlayingMovieContext from "../contexts/NowPlayingMovieContext";
import FullList from "../component/FullList";
import Loading from '../component/Loading';
import Navbar from '../component/Navbar';


export default function NowPlayingMovie() {
  const nowPlaying = useContext(NowPlayingMovieContext);

  <Navbar />
  if (nowPlaying.loading) {
    return <Loading />
  }

  return (
    <FullList movieList={nowPlaying.data} />
  )
}
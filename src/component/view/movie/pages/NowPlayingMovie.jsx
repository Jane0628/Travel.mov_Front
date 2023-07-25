import { useContext } from "react"
import NowPlayingMovieContext from "../contexts/NowPlayingMovieContext";
import FullList from "../component/FullList";
import Loading from '../component/Loading';


export default function NowPlayingMovie() {
  const nowPlaying = useContext(NowPlayingMovieContext);

  if (nowPlaying.loading) {
    return <Loading />
  }

  return (
    <FullList movieList={nowPlaying.data} />
  )
}
import { useContext } from "react"
import FullList from "../component/FullList";
import Loading from '../component/Loading';
import Navbar from '../component/Navbar';
import SearchMovieContext from "../contexts/SearchMovieContext";


export default function SearchMovie() {
  const search = useContext(SearchMovieContext);

  <Navbar />
  if (search.loading) {
    return <Loading />
  }

  return (
    <FullList movieList={search.data} />
  )
}
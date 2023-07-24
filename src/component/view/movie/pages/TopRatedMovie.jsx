import { useContext } from "react"
import FullList from "../component/FullList";
import TopRatedMovieContext from "../contexts/TopRatedMovieContext";
import Loading from "../component/Loading";

export default function TopRatedMovie() {
    const topRated = useContext(TopRatedMovieContext);

    if (topRated.loading) {
        return <Loading />
    }

    return (
        <FullList movieList={topRated.data} />
    )
}
import { useContext } from "react"
import FullList from "../component/FullList";
import PopularMovieContext from "../contexts/PopularMovieContext";
import Loading from "../component/Loading";

export default function PopularMovie() {
    const popular = useContext(PopularMovieContext);

    if (popular.loading) {
        return <Loading />
    }

    return (
        <FullList movieList={popular.data} />
    )
}
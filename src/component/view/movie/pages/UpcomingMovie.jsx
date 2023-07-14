import { useContext } from "react"
import FullList from "../component/FullList";
import UpcomingMovieContext from "../contexts/UpcomingMovieContext";
import Loading from "../component/Loading";

export default function UpcomingMovie() {
    const upcoming = useContext(UpcomingMovieContext);
    
    if(upcoming.loading){
        return <Loading/>
    }
    
    return(
        <FullList movieList={upcoming.data}/>
    )
}
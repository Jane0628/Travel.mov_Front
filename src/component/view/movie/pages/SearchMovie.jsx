import { useLocation } from 'react-router-dom';
import FullList from "../component/FullList";

const SearchMovie = () => {

  const location = useLocation();
  const searchData = location.state?.searchData || [];

  return (
    <FullList movieList={searchData} />
  );

};

export default SearchMovie;
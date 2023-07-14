import { Button } from '@mui/material';
import React from 'react'

const MovieSearch = () => {

  const searchLocation = async () => {
    
    const url = 'https://imdb8.p.rapidapi.com/title/get-filming-locations?tconst=tt12477480';
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
      console.log(result.locations[0].location);
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <Button onClick={searchLocation}>헤어질결심</Button>
  )
}

export default MovieSearch
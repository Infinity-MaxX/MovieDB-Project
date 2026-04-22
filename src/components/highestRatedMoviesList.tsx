// import React from 'react';
import { useFetchHighestRatedMoviesQuery } from '../store';
import type { Movie } from '../types/movie';
import MovieCard from './movieCard';

// Bemærk Query-function kaldes automatisk når komponenten bliver displayed
// kaldet vil straks hente data i et result-objekt, som vi "destructure" til data, error og isLoading
// Bemærk Mutation-function returnere et array med en function, som kan kaldes når data skal ændres
// samt et objekt results der er meget tilsvarende det der returneres fra et Query-function kald
// til start er results objektet "uinitialiseret", efter kaldet af funktionen vil det indeholde mange flere properties
// med relevante værdier fx data, isSucces/isError mm

function HighestRatedMoviesList() {
  const { data, error, isFetching } = useFetchHighestRatedMoviesQuery(null);
  // console.log(data, error, isFetching);
  let content;
  if (isFetching) {
    content = <div>Loading;</div>
  }
  else if (error) {
    content = <div>Error loading movies.</div>;
  }
  else {
    content = data.results
      .filter((movie : Movie) => movie.poster_path !== null && movie.vote_average !== 0 && movie.overview !== "")
      .map((movie : Movie) => {return <MovieCard key={movie.id} movie={movie}></MovieCard>});
  }
  return (
    <div className="row row-cols-3 row-cols-md-2 m-4">
      {content}
    </div>
  );
}

export default HighestRatedMoviesList;
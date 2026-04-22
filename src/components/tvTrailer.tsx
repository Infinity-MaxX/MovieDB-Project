// import React from 'react';
import { useFetchTVTrailerQuery } from "../store";
import type { TV } from "../types/tv";
// import TVCard from './tvCard';

// Bemærk Query-function kaldes automatisk når komponenten bliver displayed
// kaldet vil straks hente data i et result-objekt, som vi "destructure" til data, error og isLoading
// Bemærk Mutation-function returnere et array med en function, som kan kaldes når data skal ændres
// samt et objekt results der er meget tilsvarende det der returneres fra et Query-function kald
// til start er results objektet "uinitialiseret", efter kaldet af funktionen vil det indeholde mange flere properties
// med relevante værdier fx data, isSucces/isError mm

function TVTrailer({tv} : {tv : TV}) {
  // fetch movie trailer (playMovie feature)
  const { data: trailer, isFetching, error } = useFetchTVTrailerQuery(tv.id);
  
  let content;
  if (isFetching) {
    content = <div>Loading;</div>
  }
  else if (error) {
    content = <div>Error loading movies.</div>;
  }
  else {
    const trailerUrl = trailer
      ? `https://www.youtube.com/watch?v=${trailer.key}`
      : null;
    content = 
      <div>
        {/* only show the trailer button if a YouTube trailer exists */}
        {trailerUrl && (
          <a href={trailerUrl} className="card-trailer">
            <span className="far fa-play-circle"></span>
          </a>
        )}
      </div>;
  }
  return (
    <div>
      {content}
    </div>
  );
}

export default TVTrailer;
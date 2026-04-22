// import React from 'react';
import { useFetchPopularTVSeriesQuery } from '../store';
import type { TV } from '../types/tv';
import TVCard from './tvCard';

// Bemærk Query-function kaldes automatisk når komponenten bliver displayed
// kaldet vil straks hente data i et result-objekt, som vi "destructure" til data, error og isLoading
// Bemærk Mutation-function returnere et array med en function, som kan kaldes når data skal ændres
// samt et objekt results der er meget tilsvarende det der returneres fra et Query-function kald
// til start er results objektet "uinitialiseret", efter kaldet af funktionen vil det indeholde mange flere properties
// med relevante værdier fx data, isSucces/isError mm

function PopularTVList() {
  const {data, error, isFetching } = useFetchPopularTVSeriesQuery(null);
  // console.log(data, error, isFetching);
  
  let content;
  if (isFetching) {
    content = <div>Loading;</div>
  }
  else if (error) {
    content = <div>Error loading TV series.</div>;
  }
  else {
    content = data.results
      .filter((tv : TV) => tv.poster_path !== null && tv.vote_average !== 0 && tv.overview !== "")
      .map((tv : TV) => {
        return <TVCard key={tv.id} tv={tv}></TVCard>
      });
  }
  return (
    <div className="row row-cols-3 row-cols-md-2 m-4">
      {content}
    </div>
  );
}

export default PopularTVList;
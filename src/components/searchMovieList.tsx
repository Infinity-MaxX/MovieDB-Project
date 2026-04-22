import {
  useFetchSearchMovieQuery,
  //useFetchMultiSearchQuery, // uncomment when ready to test
  useFetchMoviesByGenreQuery,
  useFetchPersonCreditsQuery,
  type RootState
} from '../store';
import MovieCard from './movieCard';
// import TVCard from './tvCard';
// import Card from './card';
// import React from 'react';
import { type Movie } from '../types/movie';
import { useSelector } from 'react-redux';

// list all of the genres and their ids
// we explicitly want to use GENRES to tell us whether a
// string happens to be in the genres we define below and
// since vanilla JS allows you to access any property in
// GENRES (whhether it exists or not) and yields a null
// value if that property doesn't exist, we use that
// information in an IF-expression, so that words not
// defined in GENRES will evulate to null and, therefore,
// false. however, TS expects GENRES to be well-defined
// such as a mapping between strings and ints, and since
// we want SOME strings to map to null in a valid way to
// result in the intentional behaviour designed below, we
// use "any" as the type for GENRES as an escape hatch to
// make the intention for TS (and to avoid warnings for 
// this intentional behaviour)
const GENRES : any = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  "science fiction": 878,
  "tv movie": 10770,
  thriller: 53,
  war: 10752,
  western: 37
};

function SearchedMoviesList() {
  // const dispatch = useDispatch();
  const searchTerm = useSelector<RootState, string>((state) => {
    return state.searchMovie.searchTerm;
  });

  const lower = searchTerm.toLowerCase();
  let queryHook;
  // try to search for the genre first. if no genre matches 
  // the genre list, then search for movie title
  if (GENRES[lower]) {
    queryHook = useFetchMoviesByGenreQuery(GENRES[lower]);
  } else {
    queryHook = useFetchSearchMovieQuery(searchTerm);
  }

  const { data, error, isFetching } = queryHook;

  // Bemærk Query-function kaldes automatisk nå komponenten bliver displayed
  // const { data, error, isFetching } = useFetchSearchMovieQuery(searchTerm);    
  // kaldet vil straks hente data i et result-objekt, som vi "destructure" til data, error og isLoading
  // Bemærk Mutation-function returnere et array med en function, som kan kaldes når data skal ændres
  // samt et objekt results der er meget tilsvarende det der returneres fra et Query-function kald
  // til start er results objektet "uinitialiseret", efter kald af funktionen vil det indeholde mange 
  // flere properties med relevante værdier fx data, isSucces/isError
  console.log(data, error, isFetching);

  let content;
  if (isFetching) {
    content = <div>Loading;</div>
  } 
  else if (error) {
    content = <div>Error loading items.</div>;
  } 
  else {
    // design pattern: if data is not null, then access results
    // if results is not null, access the first element
    // if the first element is not null, access the media type
    // and if media type is person then the expression is true
    // if any of these expressions are null, then immediately 
    // evaluate to false without trying to access the next field
    // and follow the else clause
    if (data?.results?.[0]?.media_type === "person") {
      const personId = data.results[0].id;
      const { data: credits } = useFetchPersonCreditsQuery(personId);

      if (credits) {
        content = credits.cast
          .filter((item : Movie) => item.poster_path !== null && item.overview !== "")
          .map((item : Movie) => <MovieCard key={item.id} movie={item} />);
      }
    }
    else {
      content = data.results
        .filter((item : Movie) => item.poster_path !== null && item.overview !== "")
        .map((item : Movie) => {
          return <MovieCard key={item.id} movie={item} />
        });
    }
    
  }
  return (
    <div className="row row-cols-3 row-cols-md-2 m-4">
      {content}
    </div>
  );
}

export default SearchedMoviesList;
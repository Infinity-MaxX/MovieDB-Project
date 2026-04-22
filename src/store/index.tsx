//import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { moviesApi } from './apis/moviesApi';
import { searchMovieReducer, changeSearchTerm } from './searchMovieSlice';

export const store = configureStore({
  reducer: {
    // Dette er en mere sikker måde, ungår typos
    [moviesApi.reducerPath]: moviesApi.reducer,
    searchMovie: searchMovieReducer,
  },
  // Thunk middelware er default når der benyttes Redux Toolkit configureStore
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(moviesApi.middleware);
  }
});

setupListeners(store.dispatch);

export {
  useFetchPopularMoviesQuery,
  useFetchHighestRatedMoviesQuery,
  useFetchUpcomingMoviesQuery,
  useFetchSearchMovieQuery,
  useFetchMovieTrailerQuery,
  useFetchPopularTVSeriesQuery,
  useFetchTVTrailerQuery,
  useFetchMultiSearchQuery,
  useFetchMoviesByGenreQuery,
  useFetchPersonCreditsQuery
} from './apis/moviesApi';
export { changeSearchTerm };
export type RootState = ReturnType<typeof store.getState>;
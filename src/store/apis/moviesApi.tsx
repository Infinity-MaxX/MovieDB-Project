// import React from 'react';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MovieTrailer } from '../../types/movie';
import type { TVTrailer } from '../../types/tv';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.themoviedb.org/3/'
  }),
  endpoints(builder) {
    return {
      fetchPopularMovies: builder.query({
        query: () => {
          return {
            url: 'discover/movie',
            params: {
              page: 1, // page 1 suddenly only shows 19, why?
              sort_by: 'popularity.desc',
              api_key: API_KEY
            },
            method: 'GET',
          };
        },
      }),
      fetchHighestRatedMovies: builder.query({
        query: () => {
          return {
            url: 'discover/movie',
            params: {
              sort_by: 'vote_average.desc',
              api_key: API_KEY
            },
            method: 'GET',
          };
        },
      }),
      fetchUpcomingMovies: builder.query({
        query: () => {
          return {
            // https://developer.themoviedb.org/reference/discover-movie
            url: 'discover/movie', // select the endpoint
            params: {
              // gte stands for "greater than or equal to", so this will fetch 
              // movies with a release date in the future. toISOString() converts 
              // the date to a string in the format YYYY-MM-DDTHH:mm:ss.sssZ, and 
              // split('T')[0] takes just the date part (YYYY-MM-DD)
              // ISO stands for "international organization for standardization"
              // it is NOT an .iso file! XD
              // property must be wrapped in quotes because it contains a dot, 
              // which is not a valid character for an unquoted property name in 
              // JavaScript.
              'primary_release_date.gte': new Date().toISOString().split('T')[0],
              sort_by: 'popularity.desc',
              api_key: API_KEY // authnetication key
            },
            method: 'GET',
          };
        },
      }),
      fetchSearchMovie: builder.query({
        query: (searchTerm) => {
          return {
            url: 'search/movie',
            params: {
              query: searchTerm,
              api_key: API_KEY
            },
            method: 'GET',
          };
        },
      }),
      fetchMultiSearch: builder.query({
        query: (searchTerm) => ({
          url: 'search/multi',
          params: {
            query: searchTerm,
            api_key: API_KEY
          }
        })
      }),
      fetchMoviesByGenre: builder.query({
        query: (genreId) => ({
          url: 'discover/movie',
          params: {
            with_genres: genreId,
            api_key: API_KEY
          }
        })
      }),
      // fetchSeriesByGenre: builder.query({
      //   query: (genreId) => ({
      //     url: 'discover/tv',
      //     params: {
      //       with_genres: genreId,
      //       api_key: API_KEY
      //     }
      //   })
      // }),
      fetchPersonCredits: builder.query({
        query: (personId) => ({
          url: `person/${personId}/combined_credits`,
          params: {
            api_key: API_KEY
          }
        })
      }),
      fetchMovieTrailer: builder.query({
        query: (movieId) => ({
          url: `movie/${movieId}/videos`,
          params: {
            api_key: API_KEY
          }
        }),
        // (response) is equivelant to 'data' in popularMovieList and like
        transformResponse: (response) => {
          // Filter for YouTube trailers
          return response.results.find(
            (video : MovieTrailer) => video.type === 'Trailer' && video.site === 'YouTube'
          );
        }
      }),
      fetchPopularTVSeries: builder.query({
        query: () => {
          return {
            url: 'discover/tv',
            params: {
              sort_by: 'popularity.desc',
              api_key: API_KEY
            },
            method: 'GET',
          };
        },
      }),
      fetchTVTrailer: builder.query({
        query: (seriesId) => ({
          url: `tv/${seriesId}/videos`,
          params: {
            api_key: API_KEY
          }
        }),
        transformResponse: (response) => {
          // Filter for YouTube trailers
          return response.results.find(
            (video : TVTrailer) => video.type === 'Trailer' && video.site === 'YouTube'
          );
        }
      }),
    };
  },
});

export const {
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
} = moviesApi;
export { moviesApi };

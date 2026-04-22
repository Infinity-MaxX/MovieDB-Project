// import React from 'react';
import MovieTrailer from './movieTrailer';
// https://www.typescriptlang.org/tsconfig/#verbatimModuleSyntax
import { type Movie } from '../types/movie';

// n+1 problem: fetching the trailers is currently in a very inefficient form
// due to MovieCard fetching n trailers, depending on how movies n were fetched
// filtering lowers the amount of fetch request, but it is not much, so it still
// scales at O(n). this is not good as there exists a rate limit for the API
// note: this is a small scale assignment and does not concern us, but future 
// references and bigger projects, it is something that needs to addressed and
// made efficient to avoid performance issues and abuse of the API
function MovieCard({movie} : {movie: Movie}) {
  const posterBasePath = 'https://image.tmdb.org/t/p/w342';

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={posterBasePath + movie.poster_path}
          className="card-img-top"
          alt={movie.title}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-2">{movie.title}</h5>
          <div className="mb-2 text-warning">
            <i className="far fa-star"></i> {movie.vote_average}
          </div>
          <p className="card-text flex-grow-1">
            {movie.overview.substring(0, 125)}...
          </p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span><i className="far fa-calendar"></i> {movie.release_date}</span>
            <MovieTrailer movie={movie} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
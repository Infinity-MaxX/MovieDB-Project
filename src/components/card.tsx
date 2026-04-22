// import React from 'react';
import MovieTrailer from './movieTrailer';
import TVTrailer from './tvTrailer';

// n+1 problem: fetching the trailers is currently in a very inefficient form
// due to MovieCard fetching n trailers, depending on how movies n were fetched
// filtering lowers the amount of fetch request, but it is not much, so it still
// scales at O(n). this is not good as there exists a rate limit for the API
// note: this is a small scale assignment and does not concern us, but future 
// references and bigger projects, it is something that needs to addressed and
// made efficient to avoid performance issues and abuse of the API

// using any type because this is not yet implemented
function Card({item} : any) {
  const posterBasePath = 'https://image.tmdb.org/t/p/w185';

  // movie
  if (item.release_date && item.title) {
    return (
      <div className="col-lg-2 mb-4">
        <div className="card">
          <img src= {posterBasePath + item.poster_path} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title "><span>{item.title.substring(0,200)}</span></h5>
            <span className="far fa-star" aria-hidden="true"></span>
            <span className="ml-1">{item.vote_average}</span>
            <p className="card-text">{item.overview.substring(0,125).concat('....')}</p>
            <div className="d-flex justify-content-between p-0">
              <span className="far fa-calendar" aria-hidden="true">{item.release_date}</span>
              <MovieTrailer movie={item}></MovieTrailer>
            </div>            
          </div>
        </div>
      </div>
    );
  }
  // tv series
  else if (item.first_air_date && item.name) {
    return (
      <div className="col-lg-2 mb-4">
        <div className="card">
          <img src={posterBasePath + item.poster_path} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title "><span>{item.name.substring(0,200)}</span></h5>
            <span className="far fa-star" aria-hidden="true"></span>
            <span className="ml-1">{item.vote_average}</span>
            <p className="card-text">{item.overview.substring(0,125).concat('....')}</p>
            <div className="d-flex justify-content-between p-0">
              <span className="far fa-calendar" aria-hidden="true">{item.first_air_date}</span>
              <TVTrailer tv={item}></TVTrailer>
            </div>            
          </div>
        </div>
      </div>
    );
  }
  else {
    return (<div></div>);
  }
}

export default Card;
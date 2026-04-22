//import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HighestRatedMovieList from './components/highestRatedMoviesList';
import PopularMoviesList from "./components/popularMoviesList";
import PopularTVList from './components/popularTVSeriesList';
import UpcomingMoviesList from './components/upcomingMoviesList';
import SearchedMoviesList from './components/searchMovieList';
import SearchMovie from './components/searchMovie';
import MovieImg from './assets/images/movie_black2.jpg';
import Home from './components/home';

function App() {
  return (
    <div>
      <div className="jumbotron pb-3 pt-3">
        <div className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm">
          <div className="container-fluid d-flex align-items-center">
            <nav className="nav navbar-nav me-auto d-flex align-items-center">
              <Link to='/' className="nav-item nav-link">Home</Link>
              <Link to='/popular' className="nav-item nav-link">Popular</Link>
              <Link to='/highest-rated' className="nav-item nav-link">Highest Rated</Link>
              <Link to='/upcoming' className="nav-item nav-link">Upcoming</Link>
              <Link to='/tv-series' className="nav-item nav-link">TV Series</Link>
              <Link to='/' className="nav-item nav-link">My Favourites</Link>
              <SearchMovie/>
            </nav>
          </div>
        </div>
      <span className='h1'>React Moviefinder <img className="rounded movie_img m-3" src={MovieImg} width="75" height="75"/></span>
      {/* <span className="d-flex justify-content-between p-0">This small App demonstrates React, Redux-Toolkit, RTK Query and React-Router</span> */}
      </div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/popular' element={<PopularMoviesList/>} />    
        <Route path='/highest-rated' element={<HighestRatedMovieList/>} />
        <Route path='/upcoming' element={<UpcomingMoviesList/>} />
        <Route path='/searchedMovies' element={<SearchedMoviesList/>} /> 
        <Route path='/tv-series' element={<PopularTVList/>} />
      </Routes>
    </div>
  );
}

export default App;

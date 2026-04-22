import { useSelector, useDispatch } from 'react-redux';
import { changeSearchTerm, type RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function SearchMovie() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchTerm = useSelector<RootState, string>((state) => {
    return state.searchMovie.searchTerm;
  });
  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(event.target.value);
    dispatch(changeSearchTerm(event.target.value));
  }
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    //dette for at undgå at Browseren automatisk prøver et udføre et submit  
    event.preventDefault();
    navigate("/searchedMovies");
  }
  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchTermChange}
      />
      <button className="btn btn-outline-light" type="submit">
        Search
      </button>
    </form> 
  );
}

export default SearchMovie;
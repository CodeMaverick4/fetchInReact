import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading , setIsloading] = useState(false);
  const fetchMoviesList = async () => {
    try {
      setIsloading(true);
      const response = await fetch("https://swapi.py4e.com/api/films/");      
      const movies = await response.json()
      console.log(movies.results)
      setMoviesList(movies.results)
      setIsloading(false);
    } catch (err) {
      setIsloading(false);
      console.log(err)
    }

  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesList}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? <div>Loading...</div>:
        <MoviesList movies={moviesList} />}
      </section>
    </React.Fragment>
  );
}

export default App;

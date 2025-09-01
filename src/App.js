import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesList = useCallback(async () => {
    try {
      setIsloading(true);
      const response = await fetch("https://swapi.py4e.com/api/films/");
      if(!response.ok){
        throw new Error("Something went wrong.");
      }
      const movies = await response.json()
      console.log(movies.results)
      setMoviesList(movies.results)
      setIsloading(false);
    } catch (err) {
      setError(err)
      setIsloading(false);
      console.log(err)
    }
  },[]);

  useEffect(() => {
    let fetchInterval      
    if (error) {
      console.log("in interval ")
      fetchInterval = setInterval(() => {
        fetchMoviesList();
      }, 5000);
      
    }else{
      clearInterval(fetchInterval);
    }
    return ()=> clearInterval(fetchInterval)
  }, [error])

  useEffect(()=>{
    fetchMoviesList();
  },[])
  return (
    <React.Fragment>
      <section>
        {error ? <button onClick={()=>setError(null)}>Cancel</button>: <button onClick={fetchMoviesList}>Fetch Movies</button> }
        
      </section>
      <section>
        {isLoading ? <div>Loading...</div> :
          error ? <p>Something went wrong ....Retrying</p> :
            moviesList.length === 0 ? <p>Found no Movies</p> : <MoviesList movies={moviesList} />}
      </section>
    </React.Fragment>
  );
}

export default App;

import React, { useCallback, useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovieForm from './components/AddMovie';

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsloading] = useState(false);


  const fetchMoviesList = useCallback(async () => {
    try {
      setIsloading(true);
      const response = await fetch("https://react-http-c6392-default-rtdb.firebaseio.com/movies.json");
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }

      const movies = await response.json()
      let arr = []
      for (let key in movies) {
        arr.push({ id: key, ...movies[key] });
      }

      setMoviesList(Object.values(movies))
      setIsloading(false);
    } catch (err) {

      setIsloading(false);
      console.log(err)
    }
  }, []);

  // useEffect(() => {
  //   let fetchInterval      
  //   if (error) {
  //     console.log("in interval ")
  //     fetchInterval = setInterval(() => {
  //       fetchMoviesList();
  //     }, 5000);

  //   }else{
  //     clearInterval(fetchInterval);
  //   }
  //   return ()=> clearInterval(fetchInterval)
  // }, [error])

  useEffect(() => {
    fetchMoviesList();
  }, [])


  return (
    <React.Fragment>
      <AddMovieForm />
      <section>
        <button onClick={fetchMoviesList}>Fetch Movies</button>
      </section>
      <section>
        {isLoading ? <div>Loading...</div> :
          moviesList.length === 0 ? <p>Found no Movies</p> : <MoviesList movies={moviesList} setMoviesList={setMoviesList} />}
      </section>
    </React.Fragment>
  );
}

export default App;

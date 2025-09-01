import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  console.log(props.movies)


  const handleDelete = async (id) => {
    try {
      // setIsloading(true);
      const response = await fetch("https://react-http-c6392-default-rtdb.firebaseio.com/movies.json", {
        method: 'DELETE',
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      const data = await response.json();
      console.log(data);
      const filteredMovies = props.movies.filter(movie=>movie.id !== id)
      props.setMoviesList(filteredMovies)
      // setMovieData({ title: '', openingText: '', releaseDate: '' })
    } catch (err) {
      // setIsloading(false);
      console.log(err)
    }
  }
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default MovieList;

import { fetchMov } from './Fetch/Fetch';
import { Button } from './Button/Button';
import { useState, useEffect } from 'react';
import { List } from './Movieslist/Movieslist';
import { moviesMapper } from '../helpers/moviesmapper';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';




export const App = () => {
  const [isMoviesShown, setIsMoviesShown] = useState(false);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(``);
  const [posterImage, setPosterImage] = useState(``);

   useEffect(() => {
    if (!isMoviesShown) {
      setMovies([]);    
      setPage(1);
      return;
    }
    setIsLoading(true);
    fetchMov(page)
      .then(({ data: { results } }) => {
        setMovies(prev => [...prev, ...moviesMapper(results)]);
        setIsError(`null`);
      })
      .catch(error => {
        console.log(isError);
        setIsError(error.message);
      })
      .finally(() => setIsLoading(false));
   }, [isMoviesShown, page, isError]);
  
  
  const ShowMoviesList = () => {
    setIsMoviesShown(prev => !prev);
  };

  const onDelete = movieId => {
    setMovies(prev => prev.filter(({ id }) => id !== movieId));
  };

   const changeStatus = movieId => {
    setMovies(prev =>
      prev.map(movie => {
        if (movie.id === movieId) {
          return { ...movie, isWatched: !movie.isWatched };
        }
        return movie;
      })
    );
  };

 const openAModal = poster => {
    setPosterImage(poster);
  };

  const closeAModal = () => {
    setPosterImage('');
  };


  return (
    <div>
      <Button
        text={isMoviesShown ? 'Hide' : 'Show'}
        clickHandler={ShowMoviesList}
      />
      {isLoading && <Loader />}  
      {isMoviesShown && (
        <List
          movies={movies} 
          onDelete={onDelete}
          changeStatus={changeStatus}
              openAModal={openAModal}
      
        />
      )}
       {posterImage && <Modal image={posterImage} closeAModal={closeAModal} />}
    
    </div>
  );
};

import React from 'react';
import ReactDom from 'react-dom';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css'

const MovieList = ({movieList}) => {

    const leftMovieList = movieList.map((movieItem, index) => {
        return (
            <MovieCard key={movieItem.id}
                       movieTitle={movieItem.original_title}
                       date={movieItem.release_date}
                       genres={movieItem.genres}
                       description={movieItem.overview}
                       imgPath={movieItem.poster_path}
            />
        );
    });

    return (

        <ul className='movieList'>
            {leftMovieList}
        </ul>


    );
};

export default MovieList;
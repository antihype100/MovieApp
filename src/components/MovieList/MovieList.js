import React from 'react';
import ReactDom from 'react-dom';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

const MovieList = ({movieList, page}) => {

    const leftMovieList = movieList.map((movieItem) => {
        return (
            <MovieCard key={movieItem.id}
                       movieTitle={movieItem.original_title}
                       date={movieItem.release_date}
                       genres={movieItem.genres_ids}
                       description={movieItem.overview}
                       imgPath={movieItem.poster_path}
                       rate={movieItem.vote_average}
            />
        );
    });

    return (
        <ul className="movieList">
            {leftMovieList.slice(0 + page * 6, 6 + page * 6)}
        </ul>
    );
};

export default MovieList;
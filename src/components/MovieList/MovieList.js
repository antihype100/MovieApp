import React from 'react';
import ReactDom from 'react-dom';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

const MovieList = ({movieList, page, ratedMovies, tab, genresList}) => {

    const genresObj = {}
    genresList.forEach(el => genresObj[el.id] = el.name)

    const searchMovieList = movieList.map((movieItem) => {

        const genres = []
        for (let id in genresObj) {
           if (movieItem.genre_ids) {
               movieItem.genre_ids.forEach(el => {
                   if (el == id) {
                       genres.push(genresObj[id]);
                   }
               })
               continue
           }
            movieItem.genres.forEach(el => {
                if (el.id == id) {
                    genres.push(genresObj[id]);
                }
            })
        }

        return (
            <MovieCard key={movieItem.id}
                       keyID={movieItem.id}
                       movieTitle={movieItem.original_title}
                       date={movieItem.release_date}
                       genres={genres}
                       description={movieItem.overview}
                       imgPath={movieItem.poster_path}
                       rate={movieItem.vote_average}
                       ratedMovies={ratedMovies}
            />
        );
    });

    const ratedMovieList = ratedMovies.reverse().map((movieItem) => {
        const genres = []
        for (let id in genresObj) {
            movieItem.genre_ids.forEach(el => {
                if (el == id) {
                    genres.push(genresObj[id]);
                }
            })
        }
        return (
            <MovieCard key={movieItem.id}
                       keyID={movieItem.id}
                       movieTitle={movieItem.original_title}
                       date={movieItem.release_date}
                       genres={genres}
                       description={movieItem.overview}
                       imgPath={movieItem.poster_path}
                       rate={movieItem.vote_average}
                       ratedMovies={ratedMovies}
            />
        )
    })

    return (
        <ul className="movieList">
            {tab === 'search' ?
                searchMovieList.slice(0 + page * 6, 6 + page * 6) :
                ratedMovieList.slice(0 + page * 6, 6 + page * 6)}
        </ul>
    );
};

export default MovieList;
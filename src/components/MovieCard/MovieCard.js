import React from 'react';
import ReactDom from 'react-dom';
import './MovieCard.css'


const MovieCard = ({movieTitle, genres, description, date, imgPath}) => {

    const genresElement = genres.map(genreItem => {
        return (
            <li key={genreItem.id} className='genresList__item'>{genreItem.name}</li>
        )
    })
    const imgSrc = `http://image.tmdb.org/t/p/w500${imgPath}`
    return (

        <li className='movieCard'>
            <img className="movieImg" src={imgSrc} alt={movieTitle}/>
            <div>
                <h2 className='movieTitle'>{ movieTitle }</h2>
                <span className='releaseDate'>{ date }</span>
                <ul className='genresList'>
                    { genresElement }
                </ul>
                <p className='description'>{ description }</p>
            </div>
        </li>
    )
}

export default MovieCard
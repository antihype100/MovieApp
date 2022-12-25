import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './MovieCard.css';
import Ellipse3 from './ellipse-3.svg'
import Ellipse5 from './ellipse-5.svg'
import Ellipse7 from './ellipse-7.svg'
import Ellipse10 from './ellipse-10.svg'
import Rate from '../Rate/Rate';


class MovieCard extends Component {

    state = {
        visible: false
    };

    genresElement = this.props.genres.map(genreItem => {
        return (
            <li  className="genresList__item">{genreItem}</li>
        );
    });

    imgSrc = `http://image.tmdb.org/t/p/w500${this.props.imgPath}`;


    toggleVisible = () => {
        this.setState( { visible: !this.state.visible } )
    }

    render() {
        const visible = this.state.visible
        let ellipse = ''
        if (this.genresElement.length > 3) {
            this.genresElement = this.genresElement.slice(0, 3)
        }
        if (this.props.rate.toFixed(1) <= 3) {
            ellipse = Ellipse3
        } else if (this.props.rate.toFixed(1) <= 5) {
            ellipse = Ellipse5
        } else if (this.props.rate.toFixed(1) <= 7) {
            ellipse = Ellipse7
        } else if (this.props.rate.toFixed(1) <= 10) {
            ellipse = Ellipse10
        }

        return (
            <li className="movieCard">
                <img className="movieImg" src={this.imgSrc} alt={this.movieTitle}/>
                <div>
                    <header className='cardHeader'>
                        <h2 className="movieTitle">{this.props.movieTitle}</h2>
                        <img className='ellipse' src={ellipse} alt=""/>
                        <span className='rateNum'>{this.props.rate.toFixed(1)}</span>
                    </header>
                    <span className="releaseDate">{this.props.date}</span>
                    <ul className="genresList">
                        {this.genresElement}
                    </ul>
                    <p className={visible ? 'description show' : 'description hidden'} onClick={this.toggleStatus}>
                        {this.props.description}
                    </p>
                    <button onClick={this.toggleVisible}>{visible ? 'Скрыть' : 'Показать'} весь текст</button>
                    <Rate keyID={this.props.keyID}
                          key={this.props.keyID}
                          title_id={this.props.movieTitle}
                          ratedMoviesID={this.props.ratedMovies.findIndex(el => el.id === this.props.keyID)}
                          ratedMoviesVote={this.props.ratedMovies.map(el => el.rating)}
                    />
                </div>
            </li>
        );
    }
}

export default MovieCard;
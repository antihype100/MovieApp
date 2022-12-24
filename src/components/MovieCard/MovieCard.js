import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './MovieCard.css';
import Ellipse from './ellipse.svg'
import Rate from '../Rate/Rate';


class MovieCard extends Component {

    state = {
        visible: false
    };

    // genresElement = this.props.genres.map(genreItem => {
    //     return (
    //         <li key={genreItem.id} className="genresList__item">{genreItem.name}</li>
    //     );
    // });
    imgSrc = `http://image.tmdb.org/t/p/w500${this.props.imgPath}`;


    toggleVisible = () => {
        this.setState( { visible: !this.state.visible } )
    }

    render() {
        const visible = this.state.visible
        // if (this.genresElement.length > 3) {
        //     this.genresElement = this.genresElement.slice(0, 3)
        // }
        return (

            <li className="movieCard">
                <img className="movieImg" src={this.imgSrc} alt={this.movieTitle}/>
                <div>
                    <header className='cardHeader'>
                        <h2 className="movieTitle">{this.props.movieTitle}</h2>
                        <img className='ellipse' src={Ellipse} alt=""/>
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
                    <Rate title_id={this.props.movieTitle}/>
                </div>
            </li>
        );
    }
}

export default MovieCard;
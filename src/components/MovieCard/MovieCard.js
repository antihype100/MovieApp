import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './MovieCard.css';


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
                    <h2 className="movieTitle">{this.props.movieTitle}</h2>
                    <span className="releaseDate">{this.props.date}</span>
                    <ul className="genresList">
                        {this.genresElement}
                    </ul>
                    <p className={visible ? 'description show' : 'description hidden'} onClick={this.toggleStatus}>
                        {this.props.description}
                    </p>
                    <button onClick={this.toggleVisible}>{visible ? 'Скрыть' : 'Показать'} весь текст</button>
                </div>
            </li>
        );
    }
}

export default MovieCard;
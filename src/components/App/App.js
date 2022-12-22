import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Offline, Online} from 'react-detect-offline';
import MovieDBapi from '../../MovieDBapi';
import FilmList from '../MovieList/MovieList';
import './App.css';
import './Spin.css';
import SearchPanel from '../SearchPanel/SearchPanel';


class App extends Component {

    movieDBApi = new MovieDBapi();

    state = {
        loading: false,
        movieList: [],
        page: 1
    };

    componentDidMount() {
        for (let i = 1; i < 30; i++) {
            this.getMovie(i);
        }
    }

    getMovieOnRequest = (text) => {
        this.movieDBApi.getMovieOnRequest(text)
            .then(data => {

                this.setState(({movieList}) => {
                    const newArr =  data.results;
                    return {
                        movieList: newArr,
                        loading: true
                    };
                });
            })
            .catch(e => {})
    }

    getMovie(id) {
        this.movieDBApi.getMovie(id)
            .then(data => {
                if (data.backdrop_path != null) {
                    this.setState(({movieList}) => {
                        const newArr = [...movieList, data];
                        return {
                            movieList: newArr,
                            loading: true
                        };
                    });
                }


            })
            .catch(e => {})

    }


    render() {
        let spin = <div className="loadingio-spinner-double-ring-vlg9m4zserh">
        <div className="ldio-k7bsy3l22yh">
            <div></div>
            <div></div>
            <div>
                <div></div>
            </div>
            <div>
                <div></div>
            </div>
        </div>
    </div>;
        const loading = this.state.loading;
        let content = <>
            <FilmList movieList={this.state.movieList}
                      page={this.state.page}
            />
        </>;
        content = loading ? content : null;
        spin = !loading ? spin : null;


        return (
            <>

                        <SearchPanel getMovies={this.getMovieOnRequest}/>
                        {content}
                        {spin}


             </>
        );

    }
}

export default App;
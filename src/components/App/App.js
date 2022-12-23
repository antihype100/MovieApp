import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Offline, Online} from 'react-detect-offline';
import MovieDBapi from '../../MovieDBapi';
import SearchPanel from '../SearchPanel/SearchPanel';
import Pagination from '../Pagination/Pagination';
import MovieList from '../MovieList/MovieList';
import './App.css';
import './Spin.css';

class App extends Component {

    movieDBApi = new MovieDBapi();
    countMovie = 1;
    limit = 40;

    state = {
        loading: false,
        movieList: [],
        page: 0,
        pagesList: [1, 2, 3, 4, 5],
        random: true,
        textRequest: '',
        pageRequest: 2
    };

    componentDidMount() {
        for (this.countMovie; this.countMovie < this.limit; this.countMovie++) {
            this.getMovie(this.countMovie);
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.movieList === prevState.movieList && this.state.random) {
            if (this.state.movieList.length / 6 < this.state.page + 2) {
                this.limit += 40;
                for (this.countMovie; this.countMovie < this.limit; this.countMovie++) {
                    this.getMovie(this.countMovie);
                }
            }
        }

        if (this.state.movieList === prevState.movieList && !this.state.random) {
            if (this.state.movieList.length / 6 < this.state.page + 2) {
                this.state.pageRequest += 2;
                this.getMovieOnRequest(this.state.textRequest, this.state.pageRequest);
            }
        }
    }

    getMovieOnRequest = (text, page) => {

        this.movieDBApi.getMovieOnRequest(text, page)
            .then(data => {

                this.setState(({movieList, page, random, pagesList, textRequest, pageRequest}) => {
                    let newArr = [...movieList, ...data.results];
                    if (random) {
                        newArr = data.results;
                    }
                    if (text != textRequest) {
                        return {
                            movieList: data.results,
                            loading: true,
                            page: 0,
                            pagesList: [1, 2, 3, 4, 5],
                            random: false,
                            pageRequest: pageRequest,
                            textRequest: text
                        };
                    }
                    return {
                        movieList: newArr,
                        loading: true,
                        page: random ? 0 : page,
                        pagesList: random ? [1, 2, 3, 4, 5] : pagesList,
                        random: false,
                        pageRequest: pageRequest,
                        textRequest: text
                    };
                });
            })
            .catch(e => {
            });
    };

    getMovie(id) {
        this.movieDBApi.getMovie(id)
            .then(data => {
                if (data.backdrop_path != null) {
                    this.setState(({movieList}) => {
                        const newArr = [...movieList, data];
                        return {
                            movieList: newArr, loading: true
                        };
                    });
                }


            })
            .catch(e => {
            });

    }

    getPageNumber = (page) => {
        this.setState({
            page: page - 1
        });
    };

    nextPage = () => {
        this.setState(({page, pagesList}) => {
            return {
                page: page + 1, pagesList: pagesList.map(el => el + 1)
            };
        });
    };
    prevPage = () => {
        this.setState(({page, pagesList}) => {
            if (page === 1 || page === 0) {
                return {
                    page: 0, pagesList: [1, 2, 3, 4, 5]
                };

            }
            return {
                page: page - 1, pagesList: pagesList.map(el => el - 1)
            };
        });
    };


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
        let content = <MovieList movieList={this.state.movieList}
                       page={this.state.page}/>

        content = loading ? content : null;
        spin = !loading ? spin : null;

        if (this.state.movieList.length === 0) {
            return (
                <>
                    <SearchPanel getMovies={this.getMovieOnRequest}/>
                    <h1 style={{marginBottom: '20px'}}>Поиск не дал результатов</h1>
                    <Pagination page={this.state.page}
                                getPage={this.getPageNumber}
                                nextPage={this.nextPage}
                                prevPage={this.prevPage}
                                pagesList={this.state.pagesList}

                    />
                </>
            );
        }
        return (
            <>
                <SearchPanel getMovies={this.getMovieOnRequest}/>
                {content}
                <Pagination page={this.state.page}
                            getPage={this.getPageNumber}
                            nextPage={this.nextPage}
                            prevPage={this.prevPage}
                            pagesList={this.state.pagesList}

                />
                {spin}
            </>
        );

    }
}

export default App;
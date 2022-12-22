import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Offline, Online} from 'react-detect-offline';
import MovieDBapi from '../../MovieDBapi';
import FilmList from '../MovieList/MovieList';
import './App.css';
import './Spin.css';


class App extends Component {

    movieDBApi = new MovieDBapi();

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            movieList: [],
            page: 1
        };
    }

    componentDidMount() {
        for (let i = 1; i < 30; i++) {
            this.getMovie(i);
        }
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


            });

    }

    spin = <div className="loadingio-spinner-double-ring-vlg9m4zserh">
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

    render() {
        const loading = this.state.loading;
        let content = <>
            <FilmList movieList={this.state.movieList}
                      page={this.state.page}
            />
        </>;
        let spin = this.spin;
        content = loading ? content : null;
        spin = !loading ? spin : null;


        return (
            <div>
                <Online>
                    <>
                        {content}
                        {spin}
                    </>
                </Online>
                <Offline >
                    Нет интернета
                </Offline>
            </div>
        );

    }
}

export default App;
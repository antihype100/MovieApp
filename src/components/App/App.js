import React, {Component} from 'react';
import ReactDom from 'react-dom';
import MovieDBapi from '../../MovieDBapi';
import FilmList from '../MovieList/MovieList';
import './App.css'



class App extends Component {

    movieDBApi = new MovieDBapi()

    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            page: 1
        }
    }

    componentDidMount() {
        for (let i = 1; i < 30; i++) {
            this.getMovie(i)
        }
    }

    getMovie(id) {
        this.movieDBApi.getMovie(id)
            .then(data => {
                if (data.backdrop_path != null) {
                    this.setState(({movieList}) => {
                        const newArr = [...movieList, data]
                        return {
                            movieList: newArr
                        }
                    })
                }


            })

    }



   render() {

       return (
           <>
               <FilmList movieList={this.state.movieList}
                         page={this.state.page}
               />
           </>

       )
   }
}

export default App
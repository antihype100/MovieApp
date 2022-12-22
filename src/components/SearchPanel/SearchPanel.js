import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './SearchPanel.css'
import {debounce} from 'lodash';


class SearchPanel extends Component {

    changeValueSearchInput = debounce((text) => {
        console.log(text);
        this.props.getMovies(text)
    }, 1000)

    render() {
        return (
            <div className="searchPanelWrapper">
                <div className="searchPanelButtonWrapper">
                    <button>Search</button>
                    <button>Rated</button>
                </div>
                <input type="text"
                       onChange={(e) => this.changeValueSearchInput(e.target.value)}
                       placeholder='Type to search...'
                />
            </div>
        );
    }
}

export default SearchPanel;
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './SearchPanel.css'
import {debounce} from 'lodash';
import {tab} from '@testing-library/user-event/dist/tab';


class SearchPanel extends Component {

    changeValueSearchInput = debounce((text) => {
        console.log(text);
        this.props.getMovies(text)
    }, 1000)


    render() {
        let searchClassName = 'search'
        let ratedClassName = 'rated'
        if (this.props.tab === 'search') {
            searchClassName += ' focusSearchPanelButton'
        } else {
            ratedClassName += ' focusSearchPanelButton'
        }

        if (this.props.tab === 'rated') {
            return (
                <div className="searchPanelWrapper">
                    <div className="searchPanelButtonWrapper">
                        <button className={searchClassName} onClick={(e) => this.props.onClickTabButton(e)}>Search</button>
                        <button className={ratedClassName} onClick={(e) => this.props.onClickTabButton(e)}>Rated</button>
                    </div>
                </div>
            );
        }

        return (
            <div className="searchPanelWrapper">
                <div className="searchPanelButtonWrapper">
                    <button className={searchClassName} onClick={(e) => this.props.onClickTabButton(e)}>Search</button>
                    <button className={ratedClassName} onClick={(e) => this.props.onClickTabButton(e)}>Rated</button>
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
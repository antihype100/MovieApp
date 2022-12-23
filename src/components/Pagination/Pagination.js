import React, {Component} from 'react';
import ReactDom from 'react-dom';
import './Pagination.css';
import Next from './next.svg';
import Back from './back.svg';


class Pagination extends Component {
    render() {
        let pagesList = this.props.pagesList.map(el => {
            let className = `pageLink ${el}`;
            return (
                <li className={className}
                    key={el}
                    onClick={() => this.props.getPage(el)}
                    style={{
                        backgroundColor: el === this.props.page + 1 ? '#1890FF' : 'white',
                        color: el === this.props.page + 1 ? 'white' : 'black',
                    }}
                >
                    {el}
                </li>
            );
        });
        return (
            <div className="paginationPanel">
                <button onClick={this.props.prevPage}><img src={Back} alt=""/></button>
                <ul className="pagesList">
                    {pagesList}
                </ul>
                <button onClick={this.props.nextPage}><img src={Next} alt=""/></button>
            </div>
        );
    }
}

export default Pagination;
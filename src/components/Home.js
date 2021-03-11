import React, { Component } from 'react'
import './Home.css'
import axios from 'axios'
import Loader from '../Fountain.gif';
import { Card } from 'react-bootstrap'
import PageNavigation from './PageNavigation';
import {debounce} from 'throttle-debounce'
export default class Home extends Component {
        constructor(props) {
                super(props);

                this.state = {
                        query: '',
                        results: [],
                        loading: false,
                        message: '',
                        totalResults: 0,
                        totalPages: 0,
                        currentPageNo: 0,
                };

               
        }
        componentDidMount() {
                
                this.setState({ query:'', loading: true, message: '' }, () => {
                        this.fetchSearchResults(1, '');
                });
        }
        componentWillMount(){
                this.fetchSearchResults = debounce(500,this.fetchSearchResults)
        }
        fetchSearchResults = (updatedPageNo = '', query) => {
                const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';
                // By default the limit of results is 20
                const searchUrl = `http://localhost:4000?q=${query}${pageNumber}`;
              
               
              
                axios
                        .get(searchUrl)
                        .then((res) => {
                                
                                const total = res.data.resultsCount;
                                const totalPagesCount = this.getPagesCount(total, 100);
                                const resultNotFoundMsg = res.data.results.length === 0
                                        ? 'No Results found'
                                        : '';
                                this.setState({
                                        results: res.data.results,
                                        totalResults: res.data.resultsCount,
                                        currentPageNo: updatedPageNo,
                                        totalPages: totalPagesCount,
                                        message: resultNotFoundMsg,
                                        loading: false
                                });
                        })
                        .catch((error) => {
                                if (axios.isCancel(error) || error) {
                                        this.setState({
                                                loading: false,
                                                message: 'Failed to fetch results.Please check network',
                                        });
                                }
                        });
        };
        handleOnInputChange = (event) => {
                
                const query = event.target.value;
                this.setState({ query, loading: true, message: '' }, () => {
                        this.fetchSearchResults(1, query);
                });
        };

        getPagesCount = (total, denominator) => {
                const divisible = total % denominator === 0;
                const valueToBeAdded = divisible ? 0 : 1;
                return Math.floor(total / denominator) + valueToBeAdded;
        };

        handlePageClick = (type) => {

                const updatedPageNo =
                        'prev' === type
                                ? this.state.currentPageNo - 1
                                : this.state.currentPageNo + 1;
                if (!this.state.loading) {
                        this.setState({ loading: true, message: '' }, () => {
                                this.fetchSearchResults(updatedPageNo, this.state.query);
                        });
                }
        };
        renderSearchResults = () => {
                const { results } = this.state;
                

                if (Object.keys(results).length && results.length) {
                        return (
                                <div className="results-container">
                                        {results.map((result, index) => {
                                                return (
                                                        <Card style={{ width: "20rem" }} key={index}>
                                                                <Card.Body>
                                                                        <Card.Title>
                                                                                {result._source.first_name + " "}
                                                                                {result._source.last_name}
                                                                        </Card.Title>
                                                                        <Card.Text>
                                                                        {result._source.email}
                                                                        </Card.Text>
                                                                        <Card.Text>
                                                                               {result._source.street_address}
                                                                              
                                                                        </Card.Text>
                                                                </Card.Body>
                                                        </Card>
                                                );
                                        })}
                                </div>
                        );
                }
        };
        render() {
                const { query, message, loading, currentPageNo, totalPages } = this.state;

                const showPrevLink = 1 < currentPageNo;
                const showNextLink = totalPages > currentPageNo;
                
                return (
                        <div className="main-container">
                                {/*Heading*/}
                                <h1 className="heading">Rethink People Search Engine</h1>
                                {/*Search Input*/}
                                <div className="search-body-container">
                                <div className="search-container">
                                        <input
                                                type="text"
                                                className="form-control"
                                                value={query}
                                                id="search-input"
                                                placeholder="Search..."
                                                onChange={this.handleOnInputChange}

                                        />

                                </div>

                                {/*Error Message*/}
                                <div className='message'>
                                { message && <p>{message}</p>}
                                </div>
                                {/*Loader*/}
                                <div>
                                <img src={Loader} className={`search-loading ${loading ? 'show' : 'hide'}`} alt="loader" />
                                </div>
                                </div>
                                <div className="pagination-results-container">
                                <PageNavigation
                                        loading={loading}
                                        showPrevLink={showPrevLink}
                                        showNextLink={showNextLink}
                                        handlePrevClick={() => this.handlePageClick('prev')}
                                        handleNextClick={() => this.handlePageClick('next')}
                                />
                                { this.renderSearchResults()}
                                <PageNavigation
                                        loading={loading}
                                        showPrevLink={showPrevLink}
                                        showNextLink={showNextLink}
                                        handlePrevClick={() => this.handlePageClick('prev')}
                                        handleNextClick={() => this.handlePageClick('next')}
                                />
                                </div>
                        </div>
                )
        }

}

import movieApi from './movieApi';
import util from './util';
import AccordianItem from './accordian-item';
import React from 'react';
import Search from './search';

export default class App extends React.Component  {
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            showSnackbar: false
        };

        this.getSortedMovies = this.getSortedMovies.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.saveRating = this.saveRating.bind(this);
        this.saveComment = this.saveComment.bind(this);
        this.displaySavedMessage = this.displaySavedMessage.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.hideAllAccordians = this.hideAllAccordians.bind(this);
    }

    async componentDidMount() {
        this.setState({
            movies: await movieApi.getAllMovies()
        });
    }

    getSortedMovies() {
        let sortedMovies = this.state.movies.slice();
        sortedMovies.sort(util.caseInsensitiveSort('title'));
        return sortedMovies;
    }

    async searchHandler(title) {
        let movies = this.state.movies.slice();

        try {
            let movie = await movieApi.searchAndAddMovie(title);
            this.hideAllAccordians();

            if(movies.find(x => x.title === movie.title) == null) {
                movies.push(movie);
                this.setState({ movies });
                this.displaySavedMessage();
            } else {
                alert('Movie is already in the list below');
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async saveRating(title, rating) {
        try {
            let response = await movieApi.saveMovieRating(title, rating);
            this.displaySavedMessage();
        } catch (error) {
            alert(error.message);
        }
    }

    async saveComment(title, comment) {
        try {
            let response = await movieApi.saveMovieComment(title, comment);
            this.displaySavedMessage();
        } catch (error) {
            alert(error.message);
        }
    }

    displaySavedMessage() {
        this.setState({
            showSnackbar: true
        });

        setTimeout(() => {
            this.setState({
                showSnackbar: false
            });
        }, 1000);
    }

    hideAllAccordians() {
        let movies = this.state.movies.slice();
        movies = movies.map(movie => {
            movie.display = false;
            return movie;
        });

        this.setState({ movies });
    }

    handleOnClick(title) {
        let movies = this.state.movies.slice();
        movies = movies.map(movie => {
            if(movie.title === title) {
                if(movie.hasOwnProperty('display')) {
                    movie.display = !movie.display;
                } else {
                    movie.display = true;
                }
            }

            return movie;
        });

        this.setState({ movies });
    }

    render() {
        return (<div>
                <div className='container'>
                    <Search searchHandler={this.searchHandler} />
                    <div className='row mb-5'>
                        <div className='col-md-10 offset-md-1 mt-5 text-center'>
                            {this.getSortedMovies().map((movie, index) => {
                                return <AccordianItem
                                    {...movie}
                                    active={movie.display != null ? movie.display : ''}
                                    handleOnClickHandler={this.handleOnClick}
                                    ratingOnClickHandler={this.saveRating}
                                    commentOnChangeHandler={this.saveComment}
                                    key={index} />
                            })}
                        </div>
                    </div>
                </div>
                <div id="snackbar" className={this.state.showSnackbar ? 'show' : ''}>Saved.</div>
            </div>
        );
    }
}
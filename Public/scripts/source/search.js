import React from 'react';

export default class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movieTitle: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ movieTitle: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.searchHandler(this.state.movieTitle);
    }

    render() {
        return (<div className="row">
            <div className="col-md-4 offset-md-4 mt-5">
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Search Movie Title:</label>
                        <input type="text" id="title" name="title" className="ml-2 form-control" value={this.state.value} onChange={this.handleChange} />
                        <button id="search-movie" className="ml-2 btn btn-dark">Search</button>
                    </div>
                </form>
            </div>
        </div>);
    }
}
import React from 'react';
import Stars from './stars';
import debounce from 'lodash/debounce'

export default class AccordianItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: props.comment != null ? props.comment : ''
        };

        this.panelRef = React.createRef();
        this.getPosterUri = this.getPosterUri.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.commentChange = debounce(this.props.commentOnChangeHandler, 500);

        lastUpdate: undefined;
    }

    getPosterUri(prop) {
        return prop !== 'N/A' && prop != null
         ? prop
         : 'images/poster-placeholder.png';
    }

    handleOnChange(event){
        let newVaue = event.target.value;
        this.setState({
            comment: newVaue
        }, () => {
            this.commentChange(this.props.title, newVaue);
        });
    };

    render() {
        return (<div>
            <div className={'accordion row ' + (this.props.active ? 'active' : '')} onClick={() => this.props.handleOnClickHandler(this.props.title)}>
                <div className='text-left col-md-6'>{this.props.title}</div>
                <div className='text-right col-md-6'>{this.props.year}</div>
            </div>
            <div className='panel row col-md-12' style={{maxHeight: this.props.active ? this.panelRef.current.scrollHeight : undefined }} ref={this.panelRef}>
                <div className='panel-content col-md-12'>
                    <p>{this.props.plot}</p>
                    <Stars rating={this.props.rating} onClickHandler={ (rating) => this.props.ratingOnClickHandler(this.props.title, rating) }/>
                    <img
                        width='200'
                        height='300'
                        src={this.getPosterUri(this.props.poster_uri)}
                        className={'poster-img'} />
                        <div className='row'>
                            <div className='col-md-8 offset-md-2'>
                                <textarea
                                    className='form-control'
                                    style={{marginTop: '10px', maxHeight:'60px', minHeight: '30px'}}
                                    value={this.state.comment}
                                    onChange={this.handleOnChange}
                                    placeholder='Comments...'
                                >
                                </textarea>
                            </div>
                        </div>
                </div>

            </div>
        </div>);
    }
}
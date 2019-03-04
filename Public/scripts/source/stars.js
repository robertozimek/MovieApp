import React from 'react';

export default class Stars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            colors: this.getColorsByIndex(props.rating != null ? (props.rating - 1) : -1),
            stars: []
        };

        this.handleOnClick = this.handleOnClick.bind(this);
        this.getColorsByIndex = this.getColorsByIndex.bind(this);
    }

    getColorsByIndex(index) {
        let colors = [];
        for(let i = 0; i < index + 1; i++) {
            colors.push('#FCCA46');
        }

        for(let i = 5; i > index + 1; i--) {
            colors.push('black');
        }

        return colors;
    }

    handleOnClick(event, index) {
        this.setState({
            colors: this.getColorsByIndex(index),
            stars: []
        });

        if(this.props.onClickHandler) {
            this.props.onClickHandler(index + 1);
        }
    }

    getStar(index) {
        return <span style={{fontSize: '25px', color: this.state.colors[index] }} key={index} className='star' onClick={(event) => this.handleOnClick(event, index)}>&#9733;</span>
    }

    render() {
        if(this.state.stars.length < 5) {
            for (let i = 0; i < 5; i++) {
                this.state.stars.push(this.getStar(i));
            }
        }

        return (<div className='stars'>
            { this.state.stars.map((star) => star) }
        </div>);
    }
};
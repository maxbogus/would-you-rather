import React, {Component} from 'react'
import {connect} from 'react-redux'

class Polls extends Component {
    state = {
        answered: false
    };

    handleClick = () => {
        const {answered} = this.state;

        this.setState(() => ({
            answered: !answered
        }))
    };

    render() {
        const {questions} = this.props;
        const {answered} = this.state;

        let polls = <span> Loading ... </span>;

        if (questions) {
            polls = <div onClick={this.handleClick}>{(!answered) ? "Unanswered" : "Answered"}</div>
        }

        return (
            <div className='center'>
                <h2>Polls</h2>
                {polls}
            </div>
        )
    }
}

function mapsStateToProps({questions}) {
    return {
        questions
    }
}


export default connect(mapsStateToProps)(Polls)

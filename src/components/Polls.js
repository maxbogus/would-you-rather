import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

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
        const {authedUser, questionIds, questions} = this.props;
        const {answered} = this.state;

        const showQuestion = (question, answered) => {
            return answered === (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser));
        };

        const formName = (question) => `Would you rather ${question.optionOne.text} or ${question.optionTwo.text}?`;

        let button = <li className='active'
                         onClick={this.handleClick}>Show {(!answered) ? "unanswered" : "answered"}</li>;
        let polls = (questions) ?
            <ul>{questionIds.map((item) => (showQuestion(questions[item], answered)) ?
                <Link key={item} to={`/questions/${item}`} className='tweet'>
                    <li key={item}>{formName(questions[item])}</li>
                </Link> : null)}</ul> :
            <span> Loading ... </span>;

        return (
            <div className='center'>
                <h2>Polls</h2>
                {button}
                {polls}
            </div>
        )
    }
}

function mapsStateToProps({questions, authedUser}) {
    return {
        authedUser,
        questionIds: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp),
        questions
    }
}

export default connect(mapsStateToProps)(Polls)

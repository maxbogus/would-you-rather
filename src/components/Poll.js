import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {formatDate} from "../utils/helpers";
import {handleAnswerQuestion} from "../actions/questions";

class Poll extends Component {
    handleVote = (e, option) => {
        e.preventDefault();

        const {dispatch, question, authedUser} = this.props;
        dispatch(handleAnswerQuestion({
            authedUser,
            answerType: option,
            qid: question.id,
        }))
    };

    render() {
        const {question, users, authedUser} = this.props;

        if (question === null) {
            return <p>This Question doesn't existed</p>
        }

        const {id, author, timestamp, optionOne, optionTwo} = question;

        const checkAuthed = (votes) => votes.includes(authedUser);
        const checkStyle = (option) => {
            return {
                fontWeight: (checkAuthed(option)) ? 'bold' : null,
                textDecoration: (checkAuthed(option)) ? null : 'underline',
                color: (checkAuthed(option)) ? null : 'blue'
            }
        };
        const answeredPoll = checkAuthed(optionOne.votes) || checkAuthed(optionTwo.votes);

        const formVoteText = (option) => answeredPoll
            ? `${option.text} chose ${option.votes.length} (${option.votes.length / (Object.keys(users).length / 100)}%)`
            : option.text;

        return (
            <Link to={`/questions/${id}`} className='tweet'>
                <div className='tweet-info'>
                    <h3>Would you rather?</h3>
                    <img src={users[author].avatarURL} alt={users[author].name}/>
                    <div>{formatDate(timestamp)}</div>
                    <button disabled={answeredPoll}
                            onClick={(e) => this.handleVote(e, 'optionOne')}
                            style={checkStyle(optionOne.votes)}>{formVoteText(optionOne)}</button>
                    <p>or</p>
                    <button disabled={answeredPoll}
                            onClick={(e) => this.handleVote(e, 'optionTwo')}
                            style={checkStyle(optionTwo.votes)}>{formVoteText(optionTwo)}</button>
                </div>
            </Link>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, props) {
    const {id} = props.match.params;
    const question = questions[id];

    return {
        id,
        users,
        authedUser,
        question: question ? question : null
    }
}

export default withRouter(connect(mapStateToProps)(Poll))

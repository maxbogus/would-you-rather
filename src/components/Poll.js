import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {formatDate} from "../utils/helpers";

class Poll extends Component {
    handleVote = (e, option) => {
        e.preventDefault();

        const {dispatch, question, authedUser} = this.props;
        console.log(dispatch, question, authedUser, option)
        //todo: handle Vote
    };

    render() {
        const {question, users, authedUser} = this.props;

        if (question === null) {
            return <p>This Question doesn't existed</p>
        }

        const {id, author, timestamp, optionOne, optionTwo} = question;

        const checkAuthed = (option) => option.includes(authedUser);
        const checkStyle = (option) => {
            return {
                fontWeight: (checkAuthed(option)) ? 'bold' : null,
                textDecoration: (checkAuthed(option)) ? null : 'underline',
                color: (checkAuthed(option)) ? null : 'blue'
            }
        };
        const formVoteText = (option) => `${option.text} chose ${option.votes.length} (${option.votes.length / (Object.keys(users).length / 100)}%)`;

        return (
            <Link to={`/questions/${id}`} className='tweet'>
                <div className='tweet-info'>
                    <h3>Would you rather?</h3>
                    <img src={users[author].avatarURL} alt={users[author].name}/>
                    <div>{formatDate(timestamp)}</div>
                    <button disabled={checkAuthed(optionOne.votes)}
                            onClick={(e) => this.handleVote(e, optionOne)}
                            style={checkStyle(optionOne.votes)}>{formVoteText(optionOne)}</button>
                    <p>or</p>
                    <button disabled={checkAuthed(optionTwo.votes)}
                            onClick={(e) => this.handleVote(e, optionTwo)}
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

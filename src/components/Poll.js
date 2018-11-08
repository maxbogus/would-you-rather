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

    toMain = (e) => {
        e.preventDefault();
        this.props.history.push(`/`)
    };

    render() {
        const {question, users, authedUser} = this.props;

        if (question === null) {
            return <p>This Question doesn't existed</p>
        }

        const {id, author, timestamp, optionOne, optionTwo} = question;
        const checkStyle = (option) => {return {fontWeight: (option.includes(authedUser)) ? 'bold': null}};
        const formVoteText = (option) => `${option.text} chose ${option.votes.length} (${option.votes.length/(Object.keys(users).length/100)}%)`;

        return (
            <Link to={`/questions/${id}`} className='tweet'>
                <div className='tweet-info'>
                    <h3>Would you rather?</h3>
                    <img src={users[author].avatarURL} alt={users[author].name}/>
                    <div>{formatDate(timestamp)}</div>
                    <p style={checkStyle(optionOne.votes)}>{formVoteText(optionOne)}</p>
                    <p>or</p>
                    <p style={checkStyle(optionTwo.votes)}>{formVoteText(optionTwo)}</p>
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

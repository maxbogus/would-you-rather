import React, {Component} from 'react'
import {connect} from 'react-redux'

class Leaderboard extends Component {
    render() {
        const {questions, users} = this.props;
        console.log(questions, users);

        return (
            <div>
                Leaderboard
            </div>
        )
    }
}

function mapsStateToProps({questions, users}) {
    return {
        questions,
        users
    }
}

export default connect(mapsStateToProps)(Leaderboard)

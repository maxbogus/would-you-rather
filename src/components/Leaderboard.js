import React, {Component} from 'react'
import {connect} from 'react-redux'

class Leaderboard extends Component {
    render() {
        const {users, userIdsSorted} = this.props;
        let leaderBoard = <span> Loading ... </span>;

        if (userIdsSorted.length > 0) {
            leaderBoard = userIdsSorted.map((user) => (
                <li key={users[user].id}>
                    <img src={users[user].avatarURL} alt={users[user].name}/>
                    <span>User: {users[user].name}. Asked: {users[user].questions.length}. Answered: {Object.keys(users[user].answers).length}</span>
                </li>
            ))
        }

        return (
            <div>
                <h2 className='center'>Leaderboard</h2>
                <ul className='dashboard-list'>
                    {leaderBoard}
                </ul>
            </div>
        )
    }
}

function mapsStateToProps({users}) {
    return {
        users,
        userIdsSorted: Object.keys(users)
            .sort((a, b) => (users[b].questions.length + Object.keys(users[b].answers).length) - (users[a].questions.length + Object.keys(users[a].answers).length))
    }
}

export default connect(mapsStateToProps)(Leaderboard)

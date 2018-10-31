import React, {Component} from 'react'
import {connect} from 'react-redux'

class Login extends Component {
    handleClick = (e, id) => {
        // const {dispatch, tweet, authedUser} = this.props;
        // todo: dispatch selected user

        console.log(id);
    };

    render() {
        const {users, userIds} = this.props;
        let userList = <span> Loading ... </span>;

        if (userIds.length > 0) {
            userList = userIds.map((user) => (
                <li key={users[user].id} onClick={(e) => this.handleClick(e, users[user].id)}>
                    <img src={users[user].avatarURL} alt={users[user].name}/>
                    <span>{users[user].name}</span>
                </li>
            ))
        }

        return (
            <div>
                <h3 className='center'>Select User</h3>
                <ul className='dashboard-list'>
                    {userList}
                </ul>
            </div>
        )
    }
}

function mapsStateToProps({users}) {
    return {
        users,
        userIds: Object.keys(users)
    }
}

export default connect(mapsStateToProps)(Login)

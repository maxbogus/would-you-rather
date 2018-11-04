import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from "../actions/authedUser";

class Login extends Component {
    handleClick = (e, id) => {
        const {dispatch} = this.props;

        dispatch(setAuthedUser(id));
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
                <h2 className='center'>Select User</h2>
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

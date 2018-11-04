import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import {setAuthedUser} from "../actions/authedUser";

class Nav extends Component {
    handleClick = () => {
        const {dispatch} = this.props;

        dispatch(setAuthedUser(null));
    };

    render() {
        const {user} = this.props;
        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leader Board
                        </NavLink>
                    </li>
                    <li>
                        Active User: {user}
                        <button className='active' onClick={this.handleClick}>Logout</button>
                    </li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        user: authedUser
    }
}

export default connect(mapStateToProps)(Nav)

import React, {Component, Fragment} from 'react'
import {NavLink} from 'react-router-dom'
import connect from "react-redux/es/connect/connect";
import {setAuthedUser} from "../actions/authedUser";

class Nav extends Component {
    handleClick = () => {
        const {dispatch} = this.props;

        dispatch(setAuthedUser(null));
    };

    render() {
        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    {this.props.logged === true
                        ? <Fragment>
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
                                Active User: {this.props.user}
                                <button className='active' onClick={this.handleClick}>Logout</button>
                            </li>
                        </Fragment>
                        : null
                    }
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        logged: authedUser !== null,
        user: authedUser
    }
}

export default connect(mapStateToProps)(Nav)

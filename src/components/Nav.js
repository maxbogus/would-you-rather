import React, {Component, Fragment} from 'react'
import {NavLink} from 'react-router-dom'
import connect from "react-redux/es/connect/connect";

class Nav extends Component {
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
                            </li>
                            <li>
                                <NavLink to='/logout' activeClassName='active'>
                                    Logout
                                </NavLink>
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

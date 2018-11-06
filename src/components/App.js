import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading';

import {handleIniitalData} from "../actions/shared";
import AddQuestion from "./AddQuestion";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import Nav from "./Nav";
import Poll from "./Poll";
import Polls from "./Polls";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleIniitalData())
    }

    render() {
        const {logged} = this.props;

        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div className='container'>
                        {logged
                            ? <div>
                                <Nav/>
                                <Route path='/' exact component={Polls}/>
                                <Route path='/add' exact component={AddQuestion}/>
                                <Route path='/leaderboard' exact component={Leaderboard}/>
                                <Route path='/questions/:id' exact component={Poll}/>
                            </div>
                            : <Login/>
                        }
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapsStateToProps({authedUser}) {
    return {
        logged: authedUser !== null
    }
}

export default connect(mapsStateToProps)(App)

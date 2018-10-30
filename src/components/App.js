import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleIniitalData} from "../actions/shared";
import LoadingBar from 'react-redux-loading';
import Nav from "./Nav";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleIniitalData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div className='container'>
                        <Nav/>
                        {this.props.logged !== true
                            ?   <div>
                                Not logged
                            </div>
                            : <div>
                                Logged
                            </div>
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

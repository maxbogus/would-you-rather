import React, {Component} from 'react'
import {connect} from 'react-redux'

class Poll extends Component {
    render() {
        return (
            <div>
                Poll
            </div>
        )
    }
}

export default connect()(Poll)

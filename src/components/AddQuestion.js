import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleAddQuestion} from "../actions/questions";

class AddQuestion extends Component {
    state = {
        firstOption: '',
        secondOption: '',
        toHome: false,
    };

    handleFirstOptionChange = (e) => {
        const text = e.target.value;

        this.setState(() => ({
            firstOption: text
        }))
    };

    handleSecondOptionChange = (e) => {
        const text = e.target.value;

        this.setState(() => ({
            secondOption: text
        }))
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {firstOption, secondOption} = this.state;
        const {dispatch, id} = this.props;

        dispatch(handleAddQuestion(firstOption, secondOption));

        this.setState(() => ({
            firstOption: '',
            secondOption: '',
            toHome: !id,
        }))
    };

    render() {
        const {firstOption, secondOption, toHome} = this.state;

        if (toHome) {
            return <Redirect to='/'/>
        }

        return (
            <div className='center'>
                <h2>Would You Rather?</h2>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <input placeholder="Option one"
                               value={firstOption}
                               onChange={this.handleFirstOptionChange}
                               className='textarea'/>
                    </p>
                    <p>
                        <input placeholder="Option two"
                               value={secondOption}
                               onChange={this.handleSecondOptionChange}
                               className='textarea'/>
                    </p>
                    <button className='btn'
                            type='submit'
                            disabled={firstOption === '' || secondOption === ''}>Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect()(AddQuestion)

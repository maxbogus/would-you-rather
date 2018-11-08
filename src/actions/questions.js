import {saveQuestion} from "../utils/api";
import {hideLoading, showLoading} from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const TOGGLE_QUESTION = 'TOGGLE_QUESTION';
export const SAVE_QUESTION = 'SAVE_QUESTION';

function addQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question,
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const {authedUser} = getState();

        dispatch(showLoading());
        return saveQuestion({
            author: authedUser,
            optionOneText,
            optionTwoText
        })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => (hideLoading()))
    }
}

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

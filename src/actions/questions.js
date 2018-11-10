import {saveQuestion, saveQuestionAnswer} from "../utils/api";
import {hideLoading, showLoading} from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const SAVE_QUESTION = 'SAVE_QUESTION';

function addQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question,
    }
}

function answerQuestion(question) {
    return {
        type: ANSWER_QUESTION,
        question
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

export function handleAnswerQuestion(info) {
    return (dispatch) => {
        dispatch(answerQuestion(info));

        return saveQuestionAnswer(info)
            .catch((e) => {
                console.warn('Error in handleAnswerQuestion', e);
                dispatch(answerQuestion(info));
                alert('There was an error answering pole. Try again');
            })
    }
}

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

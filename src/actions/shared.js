import {getInitialData} from "../utils/api";
import {receiveQuestions} from "./questions";
import {receiveUsers} from "./users";
import {hideLoading, showLoading} from 'react-redux-loading'

export function handleIniitalData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(hideLoading())
            })
    }
}
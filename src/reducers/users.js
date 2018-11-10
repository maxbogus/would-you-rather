import {RECEIVE_USERS} from "../actions/users";
import {ANSWER_QUESTION, SAVE_QUESTION} from "../actions/questions"

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            };
        case ANSWER_QUESTION:
            const {authedUser, answerType, qid} = action.question;

            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answerType
                    }
                }
            };
        case SAVE_QUESTION:
            const {id, author} = action.question;

            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions:
                        state[author].questions.concat([id])
                }
            };
        default:
            return state;
    }
}

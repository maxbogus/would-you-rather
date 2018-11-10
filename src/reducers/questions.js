import {ANSWER_QUESTION, RECEIVE_QUESTIONS, SAVE_QUESTION} from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            };
        case SAVE_QUESTION:
            const {question} = action;
            return {
                ...state,
                [question.id]: question,
            };
        case ANSWER_QUESTION:
            const {qid, answerType, authedUser} = action.question;

            return {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answerType]: {
                        ...state[qid][answerType],
                        votes:
                            state[qid][answerType].votes.concat([authedUser])
                    }
                }
            };
        default:
            return state;
    }
}

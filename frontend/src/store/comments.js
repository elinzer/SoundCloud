import { csrfFetch } from './csrf';

//types
const GET_COMMENTS = 'comments/getComments';



//actions
const load = list => {
    return {
        type: GET_COMMENTS,
        payload: list
    }
}



//thunks
export const getComments = (info) => async (dispatch) => {

    const { id } = info

    const res = await fetch(`/api/songs/${id}/comments`);

    console.log(res)

    if (res.ok) {
        const list = await res.json();
        dispatch(load(list.Comments));
    }
}





//reducer
let initialState = {}

const commentsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case GET_COMMENTS:
            action.payload.forEach(comment => newState[comment.id] = comment)
            return newState;
        default:
            return state;
    }
}

export default commentsReducer;

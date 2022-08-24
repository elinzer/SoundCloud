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
export const getComments = (id) => async (dispatch) => {

    const {songId} = id;

    const res = await fetch(`/api/songs/${songId}/comments`);

    console.log(res)

    if (res.ok) {
        const list = await res.json();
        dispatch(load(list.Comments));
    }
}





//reducer
let initialState = {}

const commentsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_COMMENTS:
            newState = action.payload.forEach(comment => newState[comment.id] = comment)
        default:
            return state;
    }
}

export default commentsReducer;

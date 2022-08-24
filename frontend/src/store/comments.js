import { csrfFetch } from './csrf';

//types
const GET_COMMENTS = 'comments/getComments';
const POST_COMMENT = 'comments/postComment';
const DELETE_COMMENT = 'comments/deleteComment';


//actions
const load = list => {
    return {
        type: GET_COMMENTS,
        payload: list
    }
}

const post = comment => {
    return {
        type: POST_COMMENT,
        payload: comment
    }
}

const deleteCom = id => {
    return {
        type: DELETE_COMMENT,
        payload: id
    }
}


//thunks
//get comments
export const getComments = (info) => async (dispatch) => {

    const { id } = info
    const res = await fetch(`/api/songs/${id}/comments`);

    if (res.ok) {
        const list = await res.json();
        dispatch(load(list.Comments));
    }
}

//post comment
export const postComment = (comment) => async (dispatch) => {

    const { id, body } = comment;

    const res = await csrfFetch(`/api/songs/${id}/comments`, {
        method: "POST",
        body: JSON.stringify({
            body
        })
    })
    if (res.ok) {
        const newComment = await res.json();
        dispatch(post(newComment))
        return res;
    }
}

//delete comment
export const deleteComment = (commentId) => async (dispatch) => {
    const { id } = commentId;
    const res = await csrfFetch(`/api/comments/${id}`, {
        method: "DELETE"
    })

    if (res.ok) {
        dispatch(deleteCom(id));
        return res;
    }

}



//reducer
let initialState = {}

const commentsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_COMMENTS:
            newState = {};
            action.payload.forEach(comment => newState[comment.id] = comment)
            return newState;
        case POST_COMMENT:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_COMMENT:
            newState = { ...state };
            delete newState[action.payload];
            return newState;
        default:
            return state;
    }
}

export default commentsReducer;

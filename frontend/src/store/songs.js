import { csrfFetch } from './csrf';

//types
const ADD_SONGS = 'songs/addSongs';
const GET_ONE_SONG = 'songs/getOneSong';
const UPDATE_SONG = 'songs/updateSong';
const DELETE_SONG = 'songs/deleteSong';

//actions
const load = list => {
    return {
        type: ADD_SONGS,
        payload: list
    }
}


//thunks
export const getSongs = () => async (dispatch) => {
    const res = await csrfFetch('/api/songs');

    if (res.ok) {
        const list = await res.json();
        dispatch(load(list));
    }
};


//reducer
const initialState = {}
const songsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_SONGS:
            newState = Object.assign({}, state);
            newState = action.payload;
            return newState;
        default:
            return state;
    }
}

export default songsReducer;

import { csrfFetch } from './csrf';

//types
const ADD_SONGS = 'songs/addSongs';
const CREATE_SONG = 'songs/createSong';
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

const add = song => {
    return {
        type: CREATE_SONG,
        payload: song
    }
}

//thunks
//get songs
export const getSongs = () => async (dispatch) => {
    const res = await csrfFetch('/api/songs');
    if (res.ok) {
        const list = await res.json();
        dispatch(load(list.Songs));
    }
};

//post song
export const addSong = (info) => async (dispatch) => {

    const { userId, title, description, url, imageUrl, albumId} = info;
    
    const res = await csrfFetch('/api/songs', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            albumId,
            title,
            description,
            url,
            imageUrl
        })
    })
    const data = await res.json();
    dispatch(add(data))
    return res;
}



//reducer
const initialState = [];
const songsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_SONGS:
            newState = action.payload;
            return newState;
        case CREATE_SONG:
            newState = [...state, action.payload]
            return newState;
        default:
            return state;
    }
}

export default songsReducer;

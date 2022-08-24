import { csrfFetch } from './csrf';

//types
const ADD_SONGS = 'songs/addSongs';
const CREATE_SONG = 'songs/createSong';
const ADD_ONE_SONG = 'songs/getOneSong';
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

const addOne = song => {
    return {
        type: ADD_ONE_SONG,
        payload: song
    }
}

const deleteASong = (id) => {
    return {
        type: DELETE_SONG,
        payload: id
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

    const { userId, title, description, url, imageUrl, albumId } = info;

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


//update song
export const updateSong = (song) => async (dispatch) => {

    const { id, title, description, url, imageUrl, albumId } = song;

    const res = await csrfFetch(`/api/songs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description,
            url,
            imageUrl,
            albumId
        })
    })
    const data = await res.json();
    dispatch(addOne(data))
    return res;
}

//delete a song
export const deleteSong = (song) => async (dispatch) => {
    const { id } = song;

    const res = await csrfFetch(`/api/songs/${id}`, {
        method: 'DELETE'
    })
    dispatch(deleteASong(id));
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
        case ADD_ONE_SONG:
            newState = [...state]
            for (let i = 0; i < newState.length; i++) {
                let song = newState[i];
                if (song.id === action.payload.id) {
                    song = action.payload;
                    newState.splice(i, 1, song)
                }
            }
            console.log(newState)
            return newState;
        case DELETE_SONG:
            newState = [...state];
            for (let i = 0; i < newState.length; i++) {
                let song = newState[i];
                if (song.id === action.payload) {
                    newState.splice(i, 1)
                }
            }
            return newState;
        default:
            return state;
    }
}

export default songsReducer;

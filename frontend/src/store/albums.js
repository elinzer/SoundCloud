import { csrfFetch } from "./csrf";

//types
const GET_ALBUMS = "albums/getAlbums";
const POST_ALBUM = "albums/postAlbum";
const DELETE_ALBUM = "albums/deleteAlbum";
const UPDATE_ALBUM = "albums/updateAlbum";

//actions
const load = list => {
    return {
        type: GET_ALBUMS,
        payload: list
    }
}

const add = album => {
    return {
        type: POST_ALBUM,
        payload: album
    }
}

const deleteAlbum = id => {
    return {
        type: DELETE_ALBUM,
        payload: id
    }
}

const update = album => {
    return {
        type: UPDATE_ALBUM,
        payload: album
    }
}

//thunks
//get albums
export const getAlbums = () => async (dispatch) => {
    const res = await csrfFetch('/api/albums');
    if (res.ok) {
        const list = await res.json();
        dispatch(load(list.Albums));
    }
};

//post album
export const postAlbum = (info) => async (dispatch) => {
    const { userId, title, description, imageUrl } = info;

    const res = await csrfFetch('/api/albums', {
        method: 'POST',
        body: JSON.stringify({
            userId,
            title,
            description,
            imageUrl
        })
    })
    if (res.ok) {
        const newAlbum = await res.json();
        dispatch(add(newAlbum))
        return res;
    }
}

//delete album
export const deleteAlbums = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/albums/${id}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(deleteAlbum(id))
        return res;
    }
}

//update album
export const updateAlbum = (album) => async (dispatch) => {

    const { id, title, description, imageUrl } = album;

    const res = await csrfFetch(`/api/albums/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            description,
            imageUrl
        })
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(update(data))
        return res;
    }
}

//reducer
const initialState = {};
const albumReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ALBUMS:
            newState = {};
            action.payload.forEach(album => {
                newState[album.id] = album;
            });
            return newState;
        case POST_ALBUM:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_ALBUM:
            newState = { ...state };
            delete newState[action.payload];
            return newState;
        case UPDATE_ALBUM:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
}

export default albumReducer;

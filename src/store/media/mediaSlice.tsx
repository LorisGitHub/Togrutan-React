import {createSelector, createSlice} from '@reduxjs/toolkit';
import {GET_MEDIA_BY_ID, GET_MULTIPLE_MEDIAS, MEDIAS_PREVIEW_URL, MEDIAS_URL} from "../../constants";
import axios from "axios";

export const mediaSlice = createSlice({
    name: 'media',
    initialState: {
        value: [],
        currentMedia: null,
    },
    reducers: {
        loadAllMediaSuccess: (state, action) => {
            state.value = action.payload;
        },
        setCurrentMedia: (state, action) => {
            state.currentMedia = action.payload;
        }
    },
});

export const { loadAllMediaSuccess, setCurrentMedia } = mediaSlice.actions;

export const loadAllMedia = test => dispatch => {
    const authorizationJWT = 'JWT '+ localStorage.getItem('JWT')
    const ids = 'tt1375666;tt3748528';
    axios.post(GET_MULTIPLE_MEDIAS, {
            ids: ids,
        }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationJWT
        }}
    ).then(res => {
        console.log(res.data)
        dispatch(loadAllMediaSuccess(res.data));
    });
};

export const loadMediaById = id => dispatch => {
    const authorizationJWT = 'JWT '+ localStorage.getItem('JWT')
    axios.get(GET_MEDIA_BY_ID.concat('?imdbId=').concat(id), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationJWT
        }
    }).then(res => {
        console.log(res.data)
        dispatch(setCurrentMedia(res.data));
    });
};

export const selectMedias = state => state.media.value;
export const selectCurrentMedia = state => state.media.currentMedia;

export const selectMediasByGenre = genre => createSelector(
    selectMedias,
    medias => {
        return medias.filter(media => {
            return media.Genre.toLowerCase().includes(genre.toLowerCase());
        });
    }
)

export default mediaSlice.reducer;

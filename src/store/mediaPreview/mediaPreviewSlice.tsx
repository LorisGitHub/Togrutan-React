import {createSlice} from '@reduxjs/toolkit';
import axios from "axios";

export const mediaPreviewSlice = createSlice({
    name: 'mediaPreview',
    initialState: {
        value: [],
        filter: "",
    },
    reducers: {
        loadAllPreviewSuccess: (state, action) => {
            state.value = action.payload;
        },
        setSearchFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export const { loadAllPreviewSuccess, setSearchFilter } = mediaPreviewSlice.actions;

export const loadAllPreview = value => dispatch => {
    const authorizationJWT = 'JWT '+localStorage.getItem('JWT')
    axios.get(process.env.REACT_APP_MEDIAS_PREVIEW_URL!.concat('?data=').concat(value), {
        headers: {
            'Authorization': authorizationJWT
        }
    }).then(res => {
        dispatch(loadAllPreviewSuccess(res.data));
    });
};

export const selectMediasPreview = state => state.mediaPreview.value;
export const selectMediasPreviewFilter = state => state.mediaPreview.filter;

export default mediaPreviewSlice.reducer;

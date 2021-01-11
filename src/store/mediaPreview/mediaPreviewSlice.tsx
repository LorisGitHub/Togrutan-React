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
    axios.get(process.env.REACT_APP_DJANGO_SERV!.concat('/api/medias_preview').concat('?data=').concat(value)).then(res => {
        dispatch(loadAllPreviewSuccess(res.data));
    });
};

export const selectMediasPreview = state => state.mediaPreview.value;
export const selectMediasPreviewFilter = state => state.mediaPreview.filter;

export default mediaPreviewSlice.reducer;

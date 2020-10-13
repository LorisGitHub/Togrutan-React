import { createSlice } from '@reduxjs/toolkit';
import {MEDIAS_URL} from "../../constants";
import axios from "axios";

export const mediaSlice = createSlice({
    name: 'media',
    initialState: {
        value: [],
    },
    reducers: {
        loadAllSuccess: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { loadAllSuccess } = mediaSlice.actions;

export const loadAll = amount => dispatch => {
    axios.get(MEDIAS_URL).then(res => {
        dispatch(loadAllSuccess(res.data));
    });
};

export const selectMedias = state => state.media.value;

export default mediaSlice.reducer;

import {createSelector, createSlice} from '@reduxjs/toolkit';
import {Media} from "../../constants";
import axios from "axios";

interface MediaState {
    loading: boolean,
    value: Media[],
    currentMedia: Media,
}

const initialState = {
    loading: false,
    value: [],
    currentMedia: null,
} as unknown as MediaState

export const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        loadAllMediaSuccess: (state, action) => {
            state.value = action.payload;
            state.loading = false;
        },
        setCurrentMedia: (state, action) => {
            state.currentMedia = action.payload;
        },
        addMedia: (state, action) => {
            state.value.push(action.payload);
        },
        removeMedia: (state, action) => {
            const index = state.value.findIndex((element) => element.imdbID = action.payload.imdbId );
            state.value.splice(index, 1);
        }
    },
});

export const { setLoading, loadAllMediaSuccess, setCurrentMedia, addMedia, removeMedia } = mediaSlice.actions;

export const loadAllMedia = user => dispatch => {
    dispatch(setLoading(true));
    const authorizationJWT = 'JWT '+ localStorage.getItem('JWT')
    let idList = []
    if(user.viewed){
        idList = idList.concat(user.viewed)
    }
    if(user.planToWatch){
        idList = idList.concat(user.planToWatch)
    }
    if(user.dropped){
        idList = idList.concat(user.dropped)
    }
    axios.post(process.env.REACT_APP_DJANGO_SERV!.concat('/api/getMultipleMediaFromImdbID'), {
            ids: idList,
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
    axios.get(process.env.REACT_APP_DJANGO_SERV!.concat('/api/getMediaFromImdbID').concat('?imdbId=').concat(id)).then(res => {
        dispatch(setCurrentMedia(res.data));
    });
};

export const selectMedias = state => state.media.value;
export const selectIsMediaLoading = state => state.media.loading;
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

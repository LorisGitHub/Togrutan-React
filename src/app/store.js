import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../store/counter/counterSlice';
import mediaReducer from '../store/media/mediaSlice';
import mediaPreviewReducer from '../store/mediaPreview/mediaPreviewSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    media: mediaReducer,
    mediaPreview: mediaPreviewReducer,
  },
});

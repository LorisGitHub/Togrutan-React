import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../store/app/appSlice';
import mediaReducer from '../store/media/mediaSlice';
import mediaPreviewReducer from '../store/mediaPreview/mediaPreviewSlice';
import userSliceReducer from '../store/user/userSlice';

export default configureStore({
  reducer: {
    app: appReducer,
    media: mediaReducer,
    mediaPreview: mediaPreviewReducer,
    user: userSliceReducer,
  },
});

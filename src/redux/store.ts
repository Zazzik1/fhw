import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import modifierReducer from './slices/modifierSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        modifier: modifierReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

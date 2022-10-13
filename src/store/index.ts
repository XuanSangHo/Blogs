import { configureStore } from '@reduxjs/toolkit';
import user from '../services/user.service';

const rootReducer = {
  user,
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

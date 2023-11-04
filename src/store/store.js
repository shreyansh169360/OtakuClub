import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './homeSlice';
// import { composeWithDevTools } from 'redux-devtools-extension';

export const store = configureStore({
  reducer: {
    home:homeSlice,
  },
  devTools:true
});
import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../features/authSlice';

const rootReducer = combineReducers({
  auth: authSlice,
});

export default rootReducer;

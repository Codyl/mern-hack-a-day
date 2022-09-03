import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import ReduxLogger from 'redux-logger';

export default configureStore({
  reducer: reducer,
  middleware: [ReduxLogger],
});

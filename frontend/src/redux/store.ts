// src/redux/store.ts
import { combineReducers } from 'redux';
import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import authReducer from './auth/authReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { taskReducer } from './reducer';

const persistConfig = {
  key: 'root',
  storage,
  debug: true, // Set to true to receive warnings about non-serializable values
};

const rootReducer = combineReducers({
  tasks:taskReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
//export const store = configureStore({ reducer: persistedReducer });

export const store = configureStore({ reducer: persistedReducer,middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}), });


// Create the redux persistor
export const persistor = persistStore(store);

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;

// Define the AppDispatch type
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;

// Define a custom hook for useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

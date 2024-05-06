import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer // Combine your user reducer
});

// Configuration for Redux Persist
const persistConfig = {
  key: 'root', // Key for the root storage
  storage, // Storage engine (localStorage)
  version: 1 // Version of the persisted state
};

// Wrap the combined reducer with persistReducer to enable state persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for non-serializable parts of the state
    }),
});

// Create a persistor to persist and rehydrate the Redux store across page reloads
export const persistor = persistStore(store);

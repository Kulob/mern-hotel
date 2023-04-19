// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import authSlice from './slice/authSlice';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { PersistGate } from 'redux-persist/integration/react';

// const persistConfig = {
//   key: 'hotel',
//   version: 1,
//   storage,
// };

// const rootReducer = combineReducers({ auth: authSlice });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
// export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slice/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

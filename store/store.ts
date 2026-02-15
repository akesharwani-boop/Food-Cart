import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import authReducer from "@/features/auth/authSlice"; 

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

//  Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer, 
});


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import authApi, { authReducer } from "@/api/auth";
import categoryApi, { categoryReducer } from "@/api/category";
import orderApi, { orderReducer } from "@/api/order";
import productApi, { productReducer } from "@/api/product";
import newsApi, { newsReducer } from "@/api/news";
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import roleApi, { roleReducer } from "@/api/role";
import userApi, { userReducer } from "@/api/getuser";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  [productApi.reducerPath]: productReducer,
  [categoryApi.reducerPath]: categoryReducer,
  [authApi.reducerPath]: authReducer,
  [orderApi.reducerPath]: orderReducer,
  [newsApi.reducerPath]: newsReducer,
  [roleApi.reducerPath]: roleReducer,
  [userApi.reducerPath]: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      productApi.middleware,
      categoryApi.middleware,
      orderApi.middleware,
      newsApi.middleware,
      roleApi.middleware,
      userApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default persistStore(store);

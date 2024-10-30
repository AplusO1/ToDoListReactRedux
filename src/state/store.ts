import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "../slices/tasksSlice";
import filtersReducer from '../slices/filterSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

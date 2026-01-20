import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./slices/note.slice";
import todoReducer from "./slices/todo.slice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

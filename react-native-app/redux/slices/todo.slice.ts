import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTodosApi,
  createTodoApi,
  updateTodoApi,
  toggleTodoApi,
  deleteTodoApi,
} from "../../api/todoApi";

export interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchTodosApi();
      return res.data.todos;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (text: string, { rejectWithValue }) => {
    try {
      const res = await createTodoApi(text);
      return res.data.todo;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async ({ id, text }: { id: string; text: string }, { rejectWithValue }) => {
    try {
      await updateTodoApi(id, text);
      return { id, text };
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const toggleTodo = createAsyncThunk(
  "todo/toggleTodo",
  async (id: string, { rejectWithValue }) => {
    try {
      await toggleTodoApi(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (ids: string[], { rejectWithValue }) => {
    try {
      await deleteTodoApi(ids);
      return ids;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// Slice
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // Optimistic UI updates
    addLocal: (state, action) => {
      state.todos.push(action.payload);
    },
    replaceTempId: (state, action) => {
      const { tempId, realTodo } = action.payload;
      state.todos = state.todos.map(t =>
        t._id === tempId ? realTodo : t
      );
    },
    updateLocal: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find(t => t._id === id);
      if (todo) todo.text = text;
    },
    toggleLocal: (state, action) => {
      const todo = state.todos.find(t => t._id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteLocal: (state, action) => {
      state.todos = state.todos.filter(t => !action.payload.includes(t._id));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => { state.loading = true; })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, state => { state.loading = false; });
  },
});

export const { addLocal, updateLocal, toggleLocal, deleteLocal, replaceTempId } = todoSlice.actions;
export default todoSlice.reducer;

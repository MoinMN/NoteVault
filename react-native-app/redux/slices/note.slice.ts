import { fetchNotesApi, saveNoteApi, deleteNotesApi } from "@/api/noteApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

interface NotesState {
  notes: Note[];
  loading: boolean;
}

const initialState: NotesState = {
  notes: [],
  loading: false
};

// FETCH NOTES
export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, { rejectWithValue }) => {
    try {
      const notes = await fetchNotesApi();
      return notes;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// SAVE / UPDATE NOTE
export const saveNote = createAsyncThunk(
  "notes/saveNote",
  async (payload: { id?: string; title: string; content: string }, { rejectWithValue }) => {
    try {
      const notes = await saveNoteApi(payload);
      return notes;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// DELETE NOTES
export const deleteNotes = createAsyncThunk(
  "notes/deleteNotes",
  async (ids: string[], { rejectWithValue }) => {
    try {
      await deleteNotesApi(ids);
      return ids;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addLocal: (state, action) => {
      state.notes.unshift(action.payload);
    },
    updateLocal: (state, action) => {
      const note = state.notes.find(n => n._id === action.payload.id);
      if (note) {
        note.title = action.payload.title;
        note.content = action.payload.content;
      }
    },
    deleteLocal: (state, action) => {
      state.notes = state.notes.filter(n => !action.payload.includes(n._id));
    },
    replaceTempId: (state, action) => {
      const index = state.notes.findIndex(n => n._id === action.payload.tempId);
      if (index !== -1) state.notes[index] = action.payload.realNote;
    },
    clearLocalNote: (state) => {
      state.notes = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotes.pending, state => { state.loading = true; })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(deleteNotes.fulfilled, (state, action) => {
        state.notes = state.notes.filter(n => !action.payload.includes(n._id));
      });
  },
});

export const {
  addLocal,
  updateLocal,
  deleteLocal,
  replaceTempId,
  clearLocalNote
} = noteSlice.actions;
export default noteSlice.reducer;

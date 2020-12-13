import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Create Project Task
export const addProjectTask = createAsyncThunk(
  "backlog/addProjectTask",
  async ({ backlog_id, projectTask, history }, { rejectWithValue }) => {
    try {
      await axios.post(`/api/v1/backlog/${backlog_id}`, projectTask);
      history.push(`/projectBoard/${backlog_id}`);
    } catch (err) {
      let error = err;
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

//get All Project Tasks
export const getProjectTasks = createAsyncThunk(
  "backlog/getProjectTasks",
  async (backlog_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/backlog/${backlog_id}`);
      return response.data;
    } catch (err) {
      let error = err;
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

//get Project Task By id
export const getProjectTask = createAsyncThunk(
  "backlog/getProjectTask",
  async ({ backlog_id, pt_sequence }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/backlog/${backlog_id}/${pt_sequence}`
      );
      return response.data;
    } catch (err) {
      let error = err;
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

export const backlogSlice = createSlice({
  name: "backlog",
  initialState: {
    errors: [],
    projectTask: {},
    projectTasks: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: {
    [addProjectTask.pending]: (state) => {
      state.status = "loading";
    },
    [addProjectTask.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    [addProjectTask.fulfilled]: (state, action) => {
      state.status = "idle";
      state.errors = {};
    },
    [getProjectTasks.pending]: (state) => {
      state.status = "loading";
    },
    [getProjectTasks.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    [getProjectTasks.fulfilled]: (state, action) => {
      state.status = "idle";
      state.errors = {};
      state.projectTasks = action.payload;
    },

    [getProjectTask.pending]: (state) => {
      state.status = "loading";
    },
    [getProjectTask.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    [getProjectTask.fulfilled]: (state, action) => {
      state.status = "idle";
      state.errors = {};
      state.projectTask = action.payload;
    },
  },
});
export const selectErrors = (state) => state.backlog.errors;
export const selectBacklog = (state) => state.backlog;
export const selectProjectTasks = (state) => state.backlog.projectTasks;
export const selectProjectTask = (state) => state.backlog.projectTask;
export default backlogSlice.reducer;

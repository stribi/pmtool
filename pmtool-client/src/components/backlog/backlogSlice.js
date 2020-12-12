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

//Get All Project Task
export const getProjectTasks = createAsyncThunk(
  "backlog/getProjectTasks",
  async (backlog_id) => {
    try {
      const response = await axios.get(`/api/v1/backlog/${backlog_id}`);
      return response.data;
    } catch (error) {}
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
  },
});
export const selectErrors = (state) => state.backlog.errors;
export const selectProjectTasks = (state) => state.backlog.projectTasks;
export default backlogSlice.reducer;

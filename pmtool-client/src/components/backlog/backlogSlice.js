import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addProjectTask = createAsyncThunk(
  "backlog/addProjectTask",
  async ({ backlog_id, projectTask, history }) => {
    try {
      await axios.post(`/api/v1/backlog/${backlog_id}`, projectTask);
      history.push(`/projectBoard/${backlog_id}`);
    } catch (error) {
      console.log("error: " + error.message);
    }
  }
);

export const backlogSlice = createSlice({
  name: "backlog",
  initialState: {
    projectTask: {},
    projectTasks: [],
  },
  reducers: {},
  extraReducers: {},
});

export default backlogSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

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

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// "http://localhost:8080/api/v1/project/all"
export const getProjects = createAsyncThunk(
  "project/getProjects",
  (endpoint) => {
    return fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => json);
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState: {
    errors: [],
    project: {},
    projects: [],
    status: "idle",
  },
  reducers: {
    loadErrors: (state, action) => {
      state.errors = action.payload;
    },
    createProjectSuccess: (state, action) => {
      state.project = action.payload;
    },
  },
  extraReducers: {
    [getProjects.pending]: (state) => {
      state.status = "loading";
    },
    [getProjects.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getProjects.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.projects = action.payload;
    },
  },
});
export const selectErrors = (state) => state.project.errors;
export const selectProjects = (state) => state.project.projects;
const { loadErrors, createProjectSuccess } = projectSlice.actions;
export default projectSlice.reducer;

export const createProject = (project, history) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/project",
      project
    );
    dispatch(createProjectSuccess(response.data));
    history.push("/dashboard");
  } catch (e) {
    console.log(e.data);
    dispatch(loadErrors(e.response.data));
  }
};

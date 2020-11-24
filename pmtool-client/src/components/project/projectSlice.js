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
export const getProject = createAsyncThunk(
  "project/getProject",
  (id, history) => {
    return fetch(`http://localhost:8080/api/v1/project/${id}`)
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
    clearErrors: (state) => {
      state.errors = {};
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
    [getProject.pending]: (state) => {
      state.status = "loading";
    },
    [getProject.rejected]: (state) => {
      state.status = "failed";
    },
    [getProject.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.project = action.payload;
    },
  },
});
export const selectErrors = (state) => state.project.errors;
export const selectProjects = (state) => state.project.projects;
export const selectStatus = (state) => state.project.status;
export const selectProject = (state) => state.project.project;
const { loadErrors, clearErrors, createProjectSuccess } = projectSlice.actions;
export default projectSlice.reducer;

export const createProject = (project, history) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/project",
      project
    );
    dispatch(createProjectSuccess(response.data));
    dispatch(clearErrors());
    history.push("/dashboard");
  } catch (e) {
    console.log(e.data);
    dispatch(loadErrors(e.response.data));
  }
};

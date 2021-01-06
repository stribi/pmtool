import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// "http://localhost:8080/api/v1/project/all"
/*
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
*/

export const getProjects = createAsyncThunk(
  "project/getProjects",
  async (rejectWithValue) => {
    try {
      const response = await axios.get("/api/v1/project/all");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const getProject = createAsyncThunk(
  "project/getProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/project/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (id, { rejectWithValue }) => {
    if (window.confirm("Are you sure? Project will be deleted.")) {
      try {
        await axios.delete(`/api/v1/project/${id}`);
        return id;
      } catch (error) {
        if (!error.response) throw error;
        return rejectWithValue(error.response.data);
      }
    }
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
      console.log(action.payload);
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
      //state.errors = action.payload;
    },
    [getProjects.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.projects = action.payload;
    },
    [getProject.pending]: (state) => {
      state.status = "loading";
    },
    [getProject.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    [getProject.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.project = action.payload;
    },
    [deleteProject.pending]: (state) => {
      state.status = "deleting";
    },
    [deleteProject.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    [deleteProject.fulfilled]: (state, action) => {
      state.status = "deleted";
      //console.log(action.payload);
      state.projects = state.projects.filter(
        (project) => project.projectIdentifier !== action.payload
      );
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
    const response = await axios.post("/api/v1/project", project);
    dispatch(createProjectSuccess(response.data));
    dispatch(clearErrors());
    history.push("/dashboard");
  } catch (e) {
    //console.log(e.data);
    dispatch(loadErrors(e.response.data));
  }
};

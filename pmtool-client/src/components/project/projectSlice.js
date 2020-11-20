import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const projectSlice = createSlice({
  name: "project",
  initialState: { errors: [], project: {} },
  reducers: {
    loadErrors: (state, action) => {
      state.errors = action.payload;
    },
    createProjectSuccess: (state, action) => {
      state.project = action.payload;
    },
  },
});

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

export const selectErrors = (state) => state.project.errors;
const { loadErrors, createProjectSuccess } = projectSlice.actions;
export default projectSlice.reducer;

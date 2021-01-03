import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Register new user
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ newUser, history }, { rejectWithValue }) => {
    try {
      await axios.post("/api/v1/users/register", newUser);
      history.push("/login");
    } catch (err) {
      let error = err;
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    errors: [],
    user: {},
    status: "idle",
  },
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.status = "loading";
    },
    [registerUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = "idle";
      state.errors = {};
    },
  },
});

export const selectUser = (state) => state.users.user;
export const selectErrors = (state) => state.users.errors;
export const selectUsers = (state) => state.users;
export default usersSlice.reducer;

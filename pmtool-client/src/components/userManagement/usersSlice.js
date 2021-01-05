import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setJWTToken from "./setJWTToken";
import jwt_decode from "jwt-decode";

//Register new user
export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ newUser, history }, { rejectWithValue }) => {
    try {
      console.log(newUser);
      await axios.post("/api/v1/users/register", newUser);
      history.push("/login");
    } catch (err) {
      let error = err;
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

//Login user
export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ LoginRequest }, { rejectWithValue }) => {
    try {
      console.log(LoginRequest);
      // post => Login Request
      const res = await axios.post("/api/v1/users/login", LoginRequest);
      // extract token from res.data
      const { token } = res.data;
      console.log(token);
      // store the token in the localStorage
      localStorage.setItem("jwtToken", token);
      // set our token in header ***
      setJWTToken(token);
      // decode token on React
      const decoded = jwt_decode(token);
      // dispatch to our securityReducer

      return decoded;
    } catch (err) {
      let error = err;
      if (!error.response) throw error;

      return rejectWithValue(error.response.data);
    }
  }
);

const booleanActionPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    errors: [],
    user: {},
    status: "idle",
    validToken: false,
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
    [loginUser.pending]: (state) => {
      state.status = "loading";
    },
    [loginUser.rejected]: (state, action) => {
      state.status = "failed";
      state.errors = action.payload;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "idle";
      state.errors = {};
      state.validToken = booleanActionPayload(action.payload);
      state.user = action.payload;
    },
  },
});

export const selectUser = (state) => state.users.user;
export const selectToken = (state) => state.users.validToken;
export const selectErrors = (state) => state.users.errors;
export const selectUsers = (state) => state.users;
export default usersSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import projectReducer from "../components/project/projectSlice";
import backlogReducer from "../components/backlog/backlogSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    project: projectReducer,
    backlog: backlogReducer,
  },
});

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import { reducerUser } from "./user.js";
import { reducerCourse } from "./course.js";

const userPersist = {
  key: "user",
  storage: storage,
  whitelist: ["email"],
};

const reducers = combineReducers({
  user: persistReducer(userPersist, reducerUser),
  course: reducerCourse,
});

export default reducers;

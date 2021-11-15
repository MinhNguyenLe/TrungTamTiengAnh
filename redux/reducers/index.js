import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import { reducerUser } from "./user.js";
import { reducerCourse } from "./course.js";
import { reducerClass } from "./class.js";
import { reducerClassroom } from "./classroom.js";

const userPersist = {
  key: "account",
  storage: storage,
  whitelist: ["account"],
};

const reducers = combineReducers({
  user: persistReducer(userPersist, reducerUser),
  course: reducerCourse,
  class: reducerClass,
  classroom: reducerClassroom,
});

export default reducers;

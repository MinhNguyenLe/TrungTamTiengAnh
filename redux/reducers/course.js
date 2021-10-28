const COURSE_STATE = {
  list: [],
};

export const reducerCourse = (state = COURSE_STATE, action) => {
  switch (action.type) {
    case "SET-LIST-COURSE":
      return {
        ...state,
        list: action.payload.list,
      };
    default:
      return state;
  }
};

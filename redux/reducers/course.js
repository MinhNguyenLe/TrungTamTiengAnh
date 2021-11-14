const COURSE_STATE = {
  list: [],
  target: "",
};

export const reducerCourse = (state = COURSE_STATE, action) => {
  switch (action.type) {
    case "SET-LIST-COURSE":
      return {
        ...state,
        list: action.payload.list,
      };
    case "SET-TARGET-COURSE":
      return {
        ...state,
        target: action.payload.id,
      };
    default:
      return state;
  }
};

const CLASSROOM_STATE = {
  list: [],
  target: "",
};

export const reducerClassroom = (state = CLASSROOM_STATE, action) => {
  switch (action.type) {
    case "SET-LIST":
      return {
        ...state,
        list: action.payload.list,
      };
    case "SET-TARGET-CLASSROOM":
      return {
        ...state,
        target: action.payload.id,
      };
    default:
      return state;
  }
};

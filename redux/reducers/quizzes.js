const QUIZZES_REF_STATE = {
  refs: [],
};

export const reducerQuizzes = (state = QUIZZES_REF_STATE, action) => {
  switch (action.type) {
    case "SET-LIST-REF":
      return {
        ...state,
        refs: action.payload.refs,
      };
    case "RESET-REF":
      return {
        ...state,
        refs: action.payload.refs,
      };
    default:
      return state;
  }
};

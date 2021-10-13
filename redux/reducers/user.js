const USER_STATE = {
  id: "",
};

export const reducerUser = (state = USER_STATE, action) => {
  switch (action.type) {
    case "SET-ID-SCHOOL":
      return {
        ...state,
        id: action.payload.id,
      };
    default:
      return state;
  }
};

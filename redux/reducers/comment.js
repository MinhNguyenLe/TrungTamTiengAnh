const CMT_STATE = {
  list: [],
  target: {},
};

export const reducerCmt = (state = CMT_STATE, action) => {
  switch (action.type) {
    case "SET-LIST":
      return {
        ...state,
        list: action.payload.list,
      };
    case "SET-TARGET-CMT":
      return {
        ...state,
        target: action.payload.target,
      };
    default:
      return state;
  }
};

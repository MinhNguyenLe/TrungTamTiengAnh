const Noti_STATE = {
  list: [],
  target: {},
};

export const reducerNoti = (state = Noti_STATE, action) => {
  switch (action.type) {
    case "SET-LIST":
      return {
        ...state,
        list: action.payload.list,
      };
    case "SET-TARGET-NOTI":
      return {
        ...state,
        target: action.payload.target,
      };
    default:
      return state;
  }
};

const NotiType_STATE = {
  list: [],
  target: "",
};

export const reducerNotiType = (state = NotiType_STATE, action) => {
  switch (action.type) {
    case "SET-LIST":
      return {
        ...state,
        list: action.payload.list,
      };
    case "SET-TARGET-NOTITYPE":
      return {
        ...state,
        target: action.payload.target,
      };
    default:
      return state;
  }
};

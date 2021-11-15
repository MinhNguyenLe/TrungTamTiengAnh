const CLASS_STATE = {
  listCode: [],
};

export const reducerClass = (state = CLASS_STATE, action) => {
  switch (action.type) {
    case "SET-LIST-CODE":
      return {
        ...state,
        listCode: action.payload.listCode,
      };
    default:
      return state;
  }
};

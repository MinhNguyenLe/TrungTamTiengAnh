const CLASS_STATE = {
  listCode: [],
  target: {},
};

export const reducerClass = (state = CLASS_STATE, action) => {
  switch (action.type) {
    case "SET-LIST-CODE":
      return {
        ...state,
        listCode: action.payload.listCode,
      };
    case "SET-TARGET-CLASS":
      return {
        ...state,
        target: action.payload.target,
      };
    default:
      return state;
  }
};

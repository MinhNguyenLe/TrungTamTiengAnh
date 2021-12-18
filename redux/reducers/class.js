const CLASS_STATE = {
  listCode: [],
  target: {},
  list:[]
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
      case "SET-LIST-CLASS":
      return {
        ...state,
        list: action.payload.list,
      };
    default:
      return state;
  }
};

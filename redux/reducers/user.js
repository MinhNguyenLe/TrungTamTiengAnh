const USER_STATE = {
  email: "12312312",
  permission: true,
  id: 123,
  username: "123",
  name: "123",
  createdAt: "",
};

export const reducerUser = (state = USER_STATE, action) => {
  switch (action.type) {
    case "SET-PEOPLE":
      return {
        ...state,
        id: action.payload.id,
      };
    default:
      return state;
  }
};

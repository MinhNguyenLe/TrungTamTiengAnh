const USER_STATE = {
  account: {
    id: 18,
    userName: "",
    password: "",
    email: "",
    lastName: "",
    firstName: "",
    placeBirth: "",
    dateBirth: "",
    phoneNumber: "",
    address: "",
    gender: 0,
    permission: 0,
    nameRole: "",
    createdAt: "",
    schedule: null,
  },
};

export const reducerUser = (state = USER_STATE, action) => {
  switch (action.type) {
    case "SET-ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
    default:
      return state;
  }
};

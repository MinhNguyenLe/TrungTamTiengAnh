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
  student: [],
  teacher: [],
  targetStudent: {}
};

export const reducerUser = (state = USER_STATE, action) => {
  switch (action.type) {
    case "SET-ACCOUNT":
      return {
        ...state,
        account: action.payload.account,
      };
    case "SET-LIST-STUDENT":
      return {
        ...state,
        student: action.payload.student,
      };
    case "SET-LIST-TEACHER":
      return {
        ...state,
        teacher: action.payload.teacher,
      };
    case "SET-TARGET-STUDENT":
      return {
        ...state,
        targetStudent: action.payload.target,
      };
    default:
      return state;
  }
};

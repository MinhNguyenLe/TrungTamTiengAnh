export const setAccount = (account) => {
  return {
    type: "SET-ACCOUNT",
    payload: {
      account: account,
    },
  };
};

export const setListStudent = (student) => {
  return {
    type: "SET-LIST-STUDENT",
    payload: {
      student: student,
    },
  };
};

export const setListTeacher = (teacher) => {
  return {
    type: "SET-LIST-TEACHER",
    payload: {
      teacher: teacher,
    },
  };
};

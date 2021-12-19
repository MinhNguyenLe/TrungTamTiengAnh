export const setAccount = (account) => {
  return {
    type: "SET-ACCOUNT",
    payload: {
      account: account,
    },
  };
};

export const setStudent = (student) => {
  return {
    type: "SET-STUDENT",
    payload: {
      student: student,
    },
  };
};

export const setTeacher = (teacher) => {
  return {
    type: "SET-TEACHER",
    payload: {
      teacher: teacher,
    },
  };
};

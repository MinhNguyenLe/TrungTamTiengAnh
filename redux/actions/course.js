export const setListCourse = (list) => {
  return {
    type: "SET-LIST-COURSE",
    payload: {
      list: list,
    },
  };
};

export const setTargetCourse = (id) => {
  return {
    type: "SET-TARGET-COURSE",
    payload: {
      id: id,
    },
  };
};

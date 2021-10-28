export const setListCourse = (list) => {
  return {
    type: "SET-LIST-COURSE",
    payload: {
      list: list,
    },
  };
};

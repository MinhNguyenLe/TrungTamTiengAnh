export const setListClassroom = (list) => {
  return {
    type: "SET-LIST",
    payload: {
      list: list,
    },
  };
};

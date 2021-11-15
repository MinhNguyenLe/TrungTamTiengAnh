export const setListCode = (list) => {
  return {
    type: "SET-LIST-CODE",
    payload: {
      listCode: list,
    },
  };
};

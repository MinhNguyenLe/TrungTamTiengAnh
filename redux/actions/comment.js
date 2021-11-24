export const setListComment = (list) => {
  return {
    type: "SET-LIST",
    payload: {
      list: list,
    },
  };
};
export const setTargetComment = (id) => {
  return {
    type: "SET-TARGET-CMT",
    payload: {
      id: id,
    },
  };
};

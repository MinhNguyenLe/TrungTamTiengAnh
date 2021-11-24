export const setListNotiType = (list) => {
  return {
    type: "SET-LIST",
    payload: {
      list: list,
    },
  };
};
export const setTargetNotiType = (target) => {
  return {
    type: "SET-TARGET-NOTITYPE",
    payload: {
      target: target,
    },
  };
};

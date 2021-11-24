export const setListNoti = (list) => {
  return {
    type: "SET-LIST",
    payload: {
      list: list,
    },
  };
};
export const setTargetNoti = (target) => {
  return {
    type: "SET-TARGET-NOTI",
    payload: {
      target: target,
    },
  };
};

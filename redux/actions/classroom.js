export const setListClassroom = (list) => {
  return {
    type: "SET-LIST",
    payload: {
      list: list,
    },
  };
};
export const setTargetClassRoom = (id) => {
  return {
    type: "SET-TARGET-CLASSROOM",
    payload: {
      id: id,
    },
  };
};

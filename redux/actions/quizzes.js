export const setListRef = (refs) => {
  return {
    type: "SET-LIST-REF",
    payload: {
      refs: refs,
    },
  };
};

export const resetRef = () => {
  return {
    type: "RESET-REF",
    payload: {
      refs: [],
    },
  };
};

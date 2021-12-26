export const setListCode = (list) => {
  return {
    type: "SET-LIST-CODE",
    payload: {
      listCode: list,
    },
  };
};

export const setTargetSession = (session) => {
  return {
    type: "SET-TARGET-SESSION",
    payload: {
      session: session,
    },
  };
};

export const setTargetClass = (target) => {
  return {
    type: "SET-TARGET-CLASS",
    payload: {
      target: target,
    },
  };
};

export const setListClass = (list) => {
  return {
    type: "SET-LIST-CLASS",
    payload: {
      list: list,
    },
  };
};

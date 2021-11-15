export const setAccount = (account) => {
  return {
    type: "SET-ACCOUNT",
    payload: {
      account: account,
    },
  };
};

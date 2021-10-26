export const setPeople = (user) => {
  return {
    type: "SET-PEOPLE",
    payload: {
      email: user.email,
      permission: user.permission,
      id: user._id,
      username: user.username,
      name: user.name,
      createdAt: user.createdAt,
    },
  };
};

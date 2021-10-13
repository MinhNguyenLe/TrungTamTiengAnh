export const setPeople = (user) => {
  return {
    type: "SET-PEOPLE",
    payload: {
      banned: user.banned,
      avatar: user.avatar,
      email: user.email,
      permission: user.permission,
      id: user._id,
      username: user.username,
      name: user.name,
      createdAt: user.createdAt,
      coverImg: user.coverImg,
    },
  };
};

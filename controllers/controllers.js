import uniqId from "uniqid";
import { writeFileSync, readFileSync } from "fs";

const addNewUser = (user) => {
  const users = loadUsers();
  const newUser = {
    id: uniqId(),
    ...user,
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

const findUser = (id) => {
  const users = loadUsers();
  const findUser = users.find((m) => m.id === id);
  if (!findUser) {
    throw new Error("The user does not exist!");
  }
  return findUser;
};

const updateUser = (id, user) => {
  const users = loadUsers();
  const foundUser = users.find((m) => {
    return m.id === id;
  });

  console.log(foundUser);

  if (!foundUser) {
    throw new Error("The user does not exist, cannot update!");
  }

  const updatedUser = {
    ...foundUser,
    ...user,
    id: foundUser.id,
    updatedAt: new Date().toISOString(),
  };

  const index = users.findIndex((m) => m.id === id);
  users[index] = updatedUser;
  saveUsers(users);
  return updatedUser;
};

const transferCash = (firstId, secondId, user) => {
  const users = loadUsers();
  const foundFirstUser = users.find((m) => {
    return m.id === firstId;
  });
  const foundSecondUser = users.find((m) => {
    return m.id === secondId;
  });

  if (!foundFirstUser || !foundSecondUser) {
    throw new Error("One or more users does not exist!");
  }
  if (foundFirstUser.cash + foundFirstUser.credit < user.cashToTransfer) {
    throw new Error("There is no money");
  }
  const updatedFirstUser = {
    ...foundFirstUser,
    // ...user,
    id: foundFirstUser.id,
    cash: foundFirstUser.cash - user.cashToTransfer,
  };
  const updatedSecondUser = {
    ...foundSecondUser,
    // ...user,
    id: foundSecondUser.id,
    cash: foundSecondUser.cash + user.cashToTransfer,
  };

  const firstIndex = users.findIndex((m) => m.id === firstId);
  const secondIndex = users.findIndex((m) => m.id === secondId);
  users[firstIndex] = updatedFirstUser;
  users[secondIndex] = updatedSecondUser;
  saveUsers(users);
  return updatedSecondUser;
};

const deleteUser = (id) => {
  const users = loadUsers();
  const index = users.findIndex((m) => m.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    saveUsers(users);
    return users;
  } else {
    throw new Error("The user does not exist, cannot delete!");
  }
};

const saveUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  writeFileSync("./db/users.json", dataJSON);
};

const loadUsers = () => {
  try {
    const dataBuffer = readFileSync("./db/users.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

export {
  loadUsers,
  addNewUser,
  findUser,
  updateUser,
  transferCash,
  deleteUser,
};

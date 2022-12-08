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

export { loadUsers, addNewUser, findUser, updateUser, deleteUser };

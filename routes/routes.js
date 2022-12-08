import { Router } from "express";

import {
  loadUsers,
  addNewUser,
  findUser,
  updateUser,
  deleteUser,
  transferCash,
  deopst,
} from "../controllers/controllers.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send(loadUsers());
});

router.post("/", (req, res) => {
  console.log(req.body);
  try {
    const createUser = addNewUser(req.body);
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.get("/:id", (req, res) => {
  // console.log(req.params.id);
  try {
    res.status(200).send(findUser(req.params.id));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    res.status(200).send(updateUser(id, user));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
router.put("/depost/:id", (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    res.status(200).send(deopst(id, user));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
router.put("/:firstId/:secondId", (req, res) => {
  const { firstId } = req.params;
  const { secondId } = req.params;
  const user = req.body;
  try {
    res.status(200).send(transferCash(firstId, secondId, user));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.delete("/:id", (req, res) => {
  try {
    res.status(200).send(deleteUser(req.params.id));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

export default router;

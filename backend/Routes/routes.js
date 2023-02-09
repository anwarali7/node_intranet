import express from "express";

import {
  CreateUserController,
  getAllUserController,
} from "../Controllers/user.controller.js";

const router = express.Router();

// ==========
// AUTHENTIFICATION
// ==========

// route de creation d'un nouveau utlisateur
router.post("/user/new", CreateUserController);
//route  d'affichage des info de tous les users inscrit
router.post("/all-users", getAllUserController);

// router.get("/user/:id", UserData);
// router.post("/user/:id/edit", UserEdit);
// router.delete("/user/:id/delete", UserDelete);
// router.post("/login", Login);

// router.post("/dashboard", auth, Dashboard);

// router.get("/users/", Users);

export default router;

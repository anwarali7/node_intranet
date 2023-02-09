import express from "express";

import {
  CreateUserController,
  loginUserController,
  logoutUserController,
  updatePasswordController,
  getUserInfoController,
  getAllUserController,
  deleteUserController,
  updateUserProfilController,
} from "../Controllers/user.controller.js";

import { verifUser } from "../Middlewares/verifUser.js";

//initialisation de la variable de gestion des routes
const router = express.Router();

// route de creation d'un nouveau utlisateur
router.post("/new-user", CreateUserController);

// route de  connection d'un utilisateur existant
router.post("/login", loginUserController);

// route de  deconnection d'un user
router.delete("/logout", verifUser, logoutUserController);

//route  d'affichage des info de tous les users inscrit
router.get("/all-users", verifUser, getAllUserController);

//route  d'affichage des info d'un user connecté
router.get("/", verifUser, getUserInfoController);

// route de mise a jour du mot de passe
// patch est utiliser normalement pour un remplacement partiel, on peut donc envoyer le champs que l'on souhaite modifier
router.patch("/reset-password", updatePasswordController);

// suppression des elements

router.delete("/:_id", verifUser, deleteUserController);

// route de mise a jour des conversation client-operateur
// put est utiliser normalement pour un remplacement total de tous les champs
router.put("/modif-profilUser/:_id", verifUser, updateUserProfilController);

export default router;

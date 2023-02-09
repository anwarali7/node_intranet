import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

import { userModel } from "../Models/user.model.js";
import { hashPassword } from "../Utils/utils.js";

// la fonction qui retourne la liste de tous les utilisateurs
export async function getAllUserController(req, res) {
  const users = await userModel.getAllUsers();
  res.send(users);
}

// la fonction qui retourne le profil d'un user
export async function getUserInfoController(req, res) {
  // on recupere l'id depuis notre entete pour le passer en parametre
  const _id = req.user.id;
  // on recupere les info du user via son _id recupéré
  const userInfo = await userModel.getUserById(_id);

  res.send(userInfo);
}

// la fonction qui supprime les info sur un utilisateur depuis la base de donnée
export async function deleteUserController(req, res) {
  // on recupere l'id depuis notre entete pour le passer en parametre
  const { _id } = req.params;

  // on vérifie si le paramètre qui est passé existe dans la base de donnée
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.send("ID inconnu :" + _id);
  }

  const deleteUser = await userModel.deleteUser(_id);
  res.send(deleteUser);
}

// fonction pour la creation d'un nouveau collaborateur
export async function CreateUserController(req, res) {
  // on recupere les saisie
  const {
    gender,
    category,
    firstname,
    lastname,
    email,
    password,
    phone,
    birthdate,
    city,
    country,
    photo,
  } = req.body;

  // pour verifier la valider de notre mail
  const expressionReguliere =
    /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

  // variable de gestion des erreurs sur les champs saisis
  let errors = {
    gender: "",
    categorie: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    birthdate: "",
    city: "",
    country: "",
    photo: "",
  };

  // les differentes contrôle a faire avant la creation d'un user
  // cela evite que le serveur il crache
  // ci-dessous on verifie si les differents champs ne sont pas vide

  if (!gender) {
    // message d'erreur si champ vide
    errors.gender = "le champs civilité est obligatoire";
    res.json({ errors });
    return;
  }

  if (!category) {
    // message d'erreur si champ vide
    errors.categorie = "le champs categorie est obligatoire";
    res.json({ errors });
    return;
  }

  if (!firstname) {
    // message d'erreur si champ vide
    errors.firstname = "le champs nom est obligatoire";
    res.json({ errors });
    return;
  }

  if (!lastname) {
    // message d'erreur si champ vide
    errors.firstname = "le champs nom est obligatoire";
    res.json({ errors });
    return;
  }

  if (!email) {
    // message d'erreur si champ vide
    errors.email = "le champs email est obligatoire";
    res.json({ errors });
    return;
  }

  if (!birthdate) {
    // message d'erreur si champ vide
    errors.adresse = "le champs date de naissance est obligatoire";
    res.json({ errors });
    return;
  }

  if (!city) {
    // message d'erreur si champ vide
    errors.city = "le champs ville est obligatoire";
    res.json({ errors });
    return;
  }

  if (!country) {
    // message d'erreur si champ vide
    errors.country = "le champs pays est obligatoire";
    res.json({ errors });
    return;
  }

  if (!photo) {
    // message d'erreur si champ vide
    errors.photo = "le champs inserer image est obligatoire";
    res.json({ errors });
    return;
  }

  if (!password) {
    // message d'erreur si champ vide
    errors.password = "le champs password est obligatoire";
    res.json({ errors });
    return;
  }

  if (!phone) {
    // message d'erreur si champ vide
    errors.phone = "le champs téléphone est obligatoire";
    res.json({ errors });
    return;
  }
  // ci-dessous on verifie si les differents champs sont correctes

  if (!expressionReguliere.test(email)) {
    // message si email incorrect
    errors.email = "email incorrect";
    res.json({ errors });
    return;
  }

  if (password.length < 6) {
    // message si mot de passe trop court(donc incorrect)
    errors.password = "mot de passe trop court";
    res.json({ errors });
    return;
  }

  // on verifie si le mail n'existe pas deja avant de faire la requête
  const loggedUserByEmail = await userModel.getUserByEmail(email);
  if (loggedUserByEmail) {
    errors.email = "Cet email existe déjà";
    res.json({ errors });
    return;
  }

  const totalUser = await userModel.countAllUsers();
  // console.log(totalUser);

  let nextId = totalUser + 1;

  // on crée un utilisateur dans la base de donnée
  const newUser = await userModel.createUser(
    nextId,
    gender,
    category,
    firstname,
    lastname,
    email,
    hashPassword(password),
    phone,
    birthdate,
    city,
    country,
    photo
  );

  // on affiche un message de succes depuis notre postman
  if (newUser) {
    res.status(200).json({
      statut: "inscrit",
      message: "un utilisateur à été crée",
      userId: newUser._id,
    });
  }
}

// fonction pour la connection d'un user
export async function loginUserController(req, res) {
  // on recupere les donnée pour l'authentification
  const { email, password } = req.body;

  // on fait appel à la variable d'environnement depuis le fichier .env
  // pour la creation de notre token
  const { APP_TOKEN_SECRET } = process.env;

  // variable de gestion des erreurs sur les champs saisis
  let errors = { email: "", password: "", message: "" };

  // fonction de creation de jeton pour l'authentification
  // en utilisant L'id du user et la clé secrète de APP_TOKEN_SECRET
  const createToken = (id) => {
    return jwt.sign({ id }, APP_TOKEN_SECRET, {
      // durer de vie du jeton
      expiresIn: "45m",
    });
  };

  // les differentes contrôle a faire avant la connexion d'un user
  // cela evite que le serveur il crache

  if (!email) {
    // message d'erreur si champ vide
    errors.email = "le champs email est obligatoire";
    res.json({ errors });
    return;
  }

  if (!password) {
    // message d'erreur si champ vide
    errors.password = "le champs password est obligatoire";
    res.json({ errors });
    return;
  }

  // ci-dessous on verifie si les differents champs sont correctes

  const loggedUser = await userModel.getUserByEmail(email);
  if (!loggedUser) {
    // message si email ne se trouve pas dans la base de donnée
    errors.email = "Email incorrect";
    errors.message =
      " Votre compte(mail) n'a pas été trouvé dans la base donnée";
    res.json({ errors });
    return;
  }

  // on compare le mot de passe saisi par l'utilisateur et le mot de passe haché
  const auth = await bcrypt.compare(password, loggedUser.password);

  if (!auth) {
    // message si le mot de passe ne correspond pas a celui de la base de donnée
    errors.password = "Le mot de passe ne correspond pas";
    errors.message = " Votre mot de passe n'existe pas dans la base de donnée";
    res.json({ errors });
    return;
  }

  //si tout les contrôles on été vérifiés
  if (auth && loggedUser) {
    // on creer un token unique pour l'utilisateur
    // en utilisant son _id
    // on peut decoder le token pour voir id du user connecté via ce site:https://jwt.io/#debugger-io
    const token = createToken(loggedUser._id);

    // on met a jour le token du user depuis la base de donnée
    const refreshToken = await userModel.refreshToken(loggedUser._id, token);
    //  message si tout se passe bien
    if (refreshToken) {
      res.status(200).json({
        statut: "connecté",
        message: "Connexion réussie!",
        token: token,
      });
    }
  }
}

// fonction de déconnection d'un utilisateur
export async function logoutUserController(req, res) {
  // console.log(req.headers);

  // on recupere l'id depuis notre entete pour le passer en parametre
  const _id = req.user.id;

  console.log(_id);

  // on modifie le contenu du token de utilisateur(_id) depuis la base de donnée
  // ce qui rend le token invalid et donc impossible de naviguer sur le site
  const deleteUser = await userModel.refreshToken(_id, "");

  // pour verifier que il ya plus de token(optionnel)
  const verifyLogOut = await userModel.getUserById(_id);

  // message en cas de deconnection réussi
  if (deleteUser._id) {
    return res.json({
      status: "déconnexion",
      message: "Vous êtes déconnecté",
      // on affiche info user sans token
      verifyLogOut, //optionnel
    });
  }

  // message en cas d'erreur
  res.json({
    status: "error",
    message: "Unable to logg you out, plz try again later",
  });
}

// la fonction qui permet au user de modifier son mot de passe
export async function updatePasswordController(req, res) {
  // recuperation des données saisie par le user
  const { email, newPassword } = req.body;

  // variable de gestion des erreurs sur les champs saisis
  let errors = { email: "", newPassword: "" };

  // les differentes contrôle a faire avant la modification du mot de passe d'un user
  // cela evite que le serveur il crache
  if (!email) {
    // message d'erreur si champ vide
    errors.email = "l'email est obligatoire";
    res.json({ errors });
    return;
  }

  if (!newPassword) {
    // message d'erreur si champ vide
    errors.password = "le nouveau mot de passe est obligatoire";
    res.json({ errors });
    return;
  }

  // ci-dessous on verifie si les differents champs sont correctes
  const loggedUser = await userModel.getUserByEmail(email);
  if (!loggedUser) {
    // message si email ne se trouve pas dans la base de donnée
    errors.email = "Email incorrect";
    errors.message =
      " Votre compte(mail) n'a pas été trouvé dans la base donnée";
    res.json({ errors });
    return;
  }

  // on verifie la longueur du nouveau mot de passe
  if (newPassword.length < 6) {
    errors.newPassword = "mot de passe trop court";
    return res.json({ errors });
  }

  // si on n'as le codepin
  if (loggedUser?._id) {
    // on chiffre le mot de passe
    const hashedPass = hashPassword(newPassword);

    // on met a jour le mot de passe du user
    const user = await userModel.updatePassword(email, hashedPass);

    //on envoi un mail de confirmation en cas de succès
    if (user._id) {
      // important  de mettre le return a l'interieur du if
      return res.json({
        statut: "modification éffectué",
        // message en cas de succès
        message: "mot de passe changé avec succes",
      });
    }
  }
  res.json({
    statut: "erreur",
    // message en cas d'erreur
    message: "impossible de modifier le mot de passe. Essayez plus tard",
  });
}

// la fonction qui permet de modifier le profil user
export async function updateUserProfilController(req, res) {
  // recuperation des données saisie par l'utilisateur
  const {
    newGender,
    newCategory,
    newFirstname,
    newLastname,
    newEmail,
    newhashedPass,
    newPhone,
    newBirthdate,
    newCity,
    newCountry,
    newPhoto,
  } = req.body;

  // variable de gestion des erreurs sur les champs saisis
  let errors = {
    errorMessage: "",
  };

  // les differentes contrôle a faire avant la modification du profil d'un user
  // cela evite que le serveur il crache

  // if (
  //   !newGender ||
  //   !newCategory ||
  //   !newFirstname ||
  //   !newLastname ||
  //   !newEmail ||
  //   !newhashedPass ||
  //   !newPhone ||
  //   !newBirthdate ||
  //   !newCity ||
  //   !newCountry ||
  //   !newPhoto
  // ) {
  //   // message d'erreur si champ vide
  //   errors.errorMessage = "Veuillez remplir tous les champs";
  //   res.json({ errors });
  //   return;
  // }
  // on chiffre le mot de passe
  const hashedPass = hashPassword(newhashedPass);

  // on met a jour le mot de passe du user
  const user = await userModel.updatePassword(email, hashedPass);

  // on recupere l'id  passer en parametre
  const { _id } = req.params;

  // on vérifie si le paramètre qui est passé existe dans la base de donnée
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.send("ID inconnu :" + _id);
  }

  // on met a jour le mot de passe du user
  const updateUserProfil = await userModel.updateUserProfil(
    _id,
    newGender,
    newCategory,
    newFirstname,
    newLastname,
    newEmail,
    hashedPass,
    newPhone,
    newBirthdate,
    newCity,
    newCountry,
    newPhoto
  );

  //on envoi un message de confirmation en cas de succès
  if (updateUserProfil._id) {
    // important  de mettre le return a l'interieur du if
    return res.json({
      statut: "modification éffectué",
      // message en cas de succès
      message: "Vos donnée ont été mise à jour avec succes",
    });
  }
  res.json({
    statut: "erreur",
    // message en cas d'erreur
    message: "impossible de modifier le profil. Essayez plus tard",
  });
}

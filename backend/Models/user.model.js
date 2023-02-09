import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
// import bcrypt from "bcrypt";

// une fonction qui contient les champs de la table users de notre base de donnée
const userSchema = new mongoose.Schema(
  {
    id: {
      //type chaine de caractere
      type: String,
    },
    gender: {
      //type chaine de caractere
      type: String,
      //longueur minimal
      minLength: 3,
      //longueur maximum
      maxLength: 55,
      //pour supprimer les espacement en fin et debut de ligne
      trim: true,
    },

    category: {
      // chaine de caractere
      type: String,
      // taille max
      maxlength: 50,
    },

    firstname: {
      //type chaine de caractere
      type: String,
      //longueur minimal
      minLength: 3,
      //longueur maximum
      maxLength: 55,
      //pour supprimer les espacement en fin et debut de ligne
      trim: true,
    },

    lastname: {
      //type chaine de caractere
      type: String,
      //longueur minimal
      minLength: 3,
      //longueur maximum
      maxLength: 55,
      //pour supprimer les espacement en fin et debut de ligne
      trim: true,
    },

    email: {
      // chaine de caractere
      type: String,
      //   obliatoire
      required: true,
      //pour valider le mail
      validate: [isEmail],
      //pour toujours mettre en minuscule
      lowercase: true,
      //pour supprimer les espacement en fin et debut de ligne
      trim: true,
    },

    password: {
      // chaine de caractere
      type: String,
      //   obligatoire
      required: true,
      //taille max pour mot de passe cripter
      max: 1024,
      //taille min
      minlength: 6,
    },

    phone: {
      // chaine de caractere
      type: String,
      // taille max
      maxlength: 50,
    },

    birthdate: {
      // chaine de caractere
      type: String,
    },

    city: {
      // des nombres
      type: String,
      maxlength: 150,
    },

    country: {
      // des nombres
      type: String,
      maxlength: 150,
    },

    // admin ou collaborateur
    isAdmin: {
      type: Boolean,
      // client par defaut
      default: "false",
    },

    // pour inserer une image
    photo: {
      type: String,
      default: "",
    },

    // le jeton
    tokens: {
      token: {
        // string
        type: String,
        // longueur max
        maxlength: 500,
        // vide par defaut
        default: "",
      },
      dateCreation: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
  },
  //   pour connaitre la date a laquelle un utilsateur s'enregistre
  {
    timestamps: true,
  }
);

// creation de fontions statique pour les donnée (CRUD users)
userSchema.static("createUser", createUser);
userSchema.static("lastData", lastData);
userSchema.static("getUserByEmail", getUserByEmail);
userSchema.static("getUserById", getUserById);
userSchema.static("getAllUsers", getAllUsers);
userSchema.static("countAllUsers", countAllUsers);
userSchema.static("refreshToken", refreshToken);
userSchema.static("refreshToken", refreshToken);
userSchema.static("updatePassword", updatePassword);
userSchema.static("updateUserProfil", updateUserProfil);
userSchema.static("deleteUser", deleteUser);

// ==================================
// LES REQUÊTES DE LA BASE DE DONNÉE
// ==================================

// fonction sera appelé par le controller dans la fonction d'ajout d'un nouveau utilisateur dans la base de donneé
async function createUser(
  id,
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
  photo
) {
  // methode pour la creation d'un modele
  return await this.create({
    id,
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
  });
}

// fonction appelé par le controller pour rechercher dans la base de donné un utilisateur via son mail
//  et nous le retourne
async function getUserByEmail(email) {
  const user = await this.findOne({ email });
  if (!user) return false;
  return user;
}

// fonction appelé par le controller pour rechercher dans la base de donné un utilisateur via son id
//  et nous le retourne
async function getUserById(id) {
  const user = await this.find({ _id: id }).select("-password");
  if (!user) return false;
  return user;
}

// une fonction qui affichera la dernière donnée de notre db
async function lastData() {
  const lastUserId = await this.find({}).sort({ createdAt: -1 }).limit(1);
  return lastUserId;
}

// la fonction appelé par le controller qui cherche la liste de tous les utilisateurs pour nous les afficher
async function getAllUsers() {
  // n'affiche pas le password en front
  const AllUsers = await this.find().select("-password");
  return AllUsers;
}

// la fonction appelé par le controller pour compter le nombre de user
async function countAllUsers() {
  const countAllUsers = await this.find().count();
  return countAllUsers;
}

// fonction appelé par le controller pour actualiser le token pour un utilisateur
async function refreshToken(_id, token) {
  const newToken = await this.findOneAndUpdate(
    // recherche via id utilisateur
    { _id },
    // on met a jour la valeur du token ainsi que la date de mise a jour
    { $set: { tokens: { token: token, dateCreation: Date.now() } } },
    // option supplementaire
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return newToken;
}

// fonction appelé par le controller pour modifier le mot de passe d'un utilisateur
// depuis la base de donnée
async function updatePassword(email, newhashedPass) {
  const newPassword = await this.findOneAndUpdate(
    // recherche via son mail
    { email },
    // on modifie le mot de passe utiisateur
    // par le nouveau mot de passe haché
    { $set: { password: newhashedPass } },
    // pour valider le changement
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return newPassword;
}

// fonction appelé par le controller pour modifier le profil d'un utilisateur
// depuis la base de donnée
async function updateUserProfil(
  _id,
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
  newPhoto
) {
  const newProfil = await this.findOneAndUpdate(
    // recherche via son id
    { _id },
    // on modifie le mot de passe utiisateur
    // par le nouveau mot de passe haché
    {
      $set: {
        gender: newGender,
        category: newCategory,
        firstname: newFirstname,
        lastname: newLastname,
        email: newEmail,
        password: newhashedPass,
        phone: newPhone,
        birthdate: newBirthdate,
        city: newCity,
        country: newCountry,
        photo: newPhoto,
      },
    },
    // pour valider le changement
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return newProfil;
}

// la fonction appelé par le controller  pour supprime les info d'un utilisateur
// depuis la base de donnée
async function deleteUser(_id) {
  const deleteUserInfo = await this.deleteOne({ _id }).exec();
  return deleteUserInfo;
}

// Creation d'un Model(exemple) mongoose sur la base du Schéma
// Au cas ou je ne m'étais pas le nom de la collection alors on aura Users comme le nom de collection par defaut
const collectionName = "users";
export const userModel = mongoose.model("User", userSchema, collectionName);

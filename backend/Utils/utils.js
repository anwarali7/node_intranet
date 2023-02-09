import bcrypt from "bcrypt";

// fonction qui permet d'afficher exactement l'erreur en question
export default function afficheError(err, res) {
  console.log(err);
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
}

// fonction d'achage du mot de passe
export const hashPassword = (newPassword) => {
  const salt = 10;
  console.log(newPassword, salt);
  //remplace le mot de passe par un mot de passe crypter
  const NewPasswordHash = bcrypt.hashSync(newPassword, salt);
  return NewPasswordHash;
};

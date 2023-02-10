import jwt from "jsonwebtoken";

// cette fonction permet de confirmer si l'utilisateur a des identifiant correcte
// depuis la base de donner avant de naviguer sur le site
export function verifUser(req, res, next) {
  // on fait appel a notre notre secret dans variable d'environnement depuis le fichier .env
  const { APP_TOKEN_SECRET } = process.env;
  // on recupere notre jeton JWT dans l'entete
  const authHeader = req.headers["authorization"];
  // Format du header 'Authorization' : 'Bearer <token>'
  // On veut récupérer <token> sans 'Bearer ', on split.
  const token = authHeader && authHeader.split(' ')[1];

  // condition si pas de token
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    // si y'a un token on verifie le token
    const decoded = jwt.verify(token, APP_TOKEN_SECRET);
    // on crée une varibale user dans notre entete req pour lui affecter le contenu du token decode
    req.user = decoded;
    // console.log(decoded.id);

    // si id du user connecté
    if (decoded.id) {
      // on passe a l'action suivante
      next();
    } else {
      // message en cas d'erreur
      console.log("Erreur Authentification Body Raw");
      throw "erreur identification userid";
    }
  } catch (err) {
    // resulat en cas de token invalide
    return res.status(401).send("Invalid Token");
  }
}

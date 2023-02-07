import jwt from 'jsonwebtoken';

// vars to replace once database is done
const USERNAME = "admin@admin.com";

/**
 * Verifies login data (email and password), if valid sends a token to the
 * client to use for authentication.
 */
export default function login(req, res) {
  // TODO: check if email is valid.
  // TODO: check if password is valid.
  // TODO: check if account with email exists.
  // TODO: check if password is correct.
  // TODO: replace const with real values.

  const token = jwt.sign(
    {email: USERNAME},
    process.env.APP_TOKEN_SECRET,
    { 
      expiresIn: '1800s' 
    }
  )
  res.json(token);
}

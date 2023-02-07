import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  // todo verify token
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // console.log(authHeader);
  // console.log(token);

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.APP_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

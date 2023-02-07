export default (req, res, next) => {
  // check in database if user is admin
  const isAdmin = false;

  if (isAdmin === false) {
    return res.sendStatus(403);
  } else {
    return next();
  }
};

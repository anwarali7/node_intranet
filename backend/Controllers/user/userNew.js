export default function UserNew(req, res) {
  // Get data from req to create user
  const data = "something";

  // create new user in database, handle errors

  // send ok message
  res.json({message: "New user created."});
}

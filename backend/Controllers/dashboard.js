export default function dashboard(req, res) {
  console.log(req.user);
  res.json({ message: `Dashboard access granted to ${JSON.stringify(req.user)}`});
}

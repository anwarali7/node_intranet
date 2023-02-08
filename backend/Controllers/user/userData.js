export default function UserData(req, res) {
  // Get userid or email from :id
  const userId = "something";

  // query database, handle errors

  // send user data
  res.json({ 
    gender: "male",
    firstname: "Owen",
    lastname: "Lopez",
    email: "owen.lopez@example.com",
    phone: "02-37-79-78-39",
    birthdate: "1992-12-26",
    city: "Villeurbanne",
    country: "France",
    photo: "https://randomuser.me/api/portraits/men/40.jpg",
    category: "Marketing",
    isAdmin: false,
  });
}

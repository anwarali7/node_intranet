import express from "express";
const router = express.Router();

import Login from "../Controllers/login.js";
import Dashboard from "../Controllers/dashboard.js";
import Users from "../Controllers/user/users.js";
import UserNew from "../Controllers/user/userNew.js";
import UserData from "../Controllers/user/userData.js";
import UserEdit from "../Controllers/user/userEdit.js";
import UserDelete from "../Controllers/user/userDelete.js";

import auth from "../Middlewares/auth.js";

// Homepage
router.get("/", (req, res) => {
  res.json({ message: "homepage" });
});

router.post("/login", Login);

router.post("/dashboard", auth, Dashboard);

router.get("/users/", Users);

router.post("/user/new", UserNew);
router.get("/user/:id", UserData);
router.post("/user/:id/edit", UserEdit);
router.delete("/user/:id/delete", UserDelete);

export default router;
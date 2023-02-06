import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// get config vars
dotenv.config({ path: "./Config/.env" });

// access config var
console.log(process.env.TOKEN_SECRET);

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  Credential: true,
  method: "GET",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({message: "homepage"});
});

app.listen(8000, () => {
  console.log(`App listening at http://localhost:8000`);
});
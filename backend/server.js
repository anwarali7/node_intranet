import express from "express";
import cors from "cors";

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
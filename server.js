import express from "express";
import bcrypt from "bcrypt";
import * as database from "./database.js";
import { generateToken, authorize } from "./jwt.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  if (!email || !password) {
    res.status(400).send({ status: "error", message: "Missing fields." });
    return;
  }

  const user = await database.getUserWithEmail(email);

  if (!user) {
    res.status(400).send({ status: "error", message: "User not found." });
    return;
  }

  const hashedPassword = user.password;
  const same = await bcrypt.compare(password, hashedPassword);

  if (!same) {
    res.status(400).send({ status: "error", message: "Wrong password" });
    return;
  }

  const accessToken = generateToken({
    sub: user.id,
    email: user.email,
    displayName: user.displayName,
  });

  res.send({ accessToken: accessToken });
});

app.post("/api/getNewToken", async (req, res) => {
  const { sub, email, displayName } = req.body;

  const accessToken = generateToken({
    sub: sub,
    email: email,
    displayName: displayName,
  });

  res.send({ accessToken: accessToken });
});

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  database.createUser({
    email,
    password: hashedPassword,
    displayName: name,
    profileImage: "default.jpg",
  });

  res.send({ status: "ok" });
});

app.put("/api/users/displayName", authorize, async (req, res) => {
  const { displayName, email } = req.body;
  const { sub } = req.user;

  console.log(`New Display Name: ${displayName}, sub: ${sub}, email: ${email}`);

  const result = await database.updateUserDisplayName(sub, displayName);
  const user = await database.getUserWithEmail(email);

  const accessToken = generateToken({
    sub: sub,
    email: user.email,
    displayName: user.displayName,
  });

  res.send({ status: "ok", result: result, accessToken: accessToken });
});

app.put("/api/users/:id/profileImage", (req, res) => {
  console.log("update profile image", req.body);
  res.send({ status: "ok" });
});

// listen on port 8080
app.listen(8080, () => console.log("Listening on port 8080"));

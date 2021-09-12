require("dotenv").config();
const express = require("express");
const db = require("./config/database");
const User = require("./models/User");

db.authenticate() // Performs: SELECT 1+1 AS result
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Hello World" }));

app.post("/user", async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    res.json({ user: newUser }); // Returns the new user that is created in the database
  } catch (error) {
    console.error(error);
  }
});

app.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findAll({
      where: {
        id: userId,
      },
    });

    res.json({ user });
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () =>
  console.log(`listening on port http://localhost:${port}!`)
);

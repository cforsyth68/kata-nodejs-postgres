require("dotenv").config();
const express = require("express");
const Sequelize = require("sequelize");

const conn_str = process.env.POSTGRES_CON_STR;
const sequelize = new Sequelize(conn_str);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const User = sequelize.define("user", {
  firstName: {
    type: Sequelize.STRING,

    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});

// Note: using `force: true` will drop the table if it already exists

User.sync({ force: true });

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Hello World" }));

app.post("/user", async (req, res) => {
  try {
    const newUser = new User(req.body);

    await newUser.save();

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

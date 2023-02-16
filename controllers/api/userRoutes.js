const router = require("express").Router();
const session = require("express-session");
const { Asteroid, Comment, User } = require("../../models");

// Creates a user with their input and creates the session for the user.

router.post("/signup", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((userData) => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.json(userData);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//Allows the user to login if the credentials match the database else throw error.

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(async (userData) => {
      
      if (!userData) {
        res
          .status(400)
          .json({ message: "A user with that username was not found." });
        return;
      }
      const checkPassword = await userData.checkPassword(req.body.password);
      console.log(req.body.password);
      console.log(checkPassword);
      if (!checkPassword) {
        return res.status(400).json({ message: "Incorrect password entered." });
      }

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        return res.json({ user: userData, message: "You have logged in." });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

// Logs the user out, and destroys session.

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

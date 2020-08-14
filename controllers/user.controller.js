const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/user.model");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../validation/user");

module.exports = {
  registerUser: (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  },

  loginUser: (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926,
            },
            (err, token) => {
              res.json({
                success: true,
                token: token,
                user: {
                  email: user.email,
                },
              });
            }
          );
        } else {
          return res.status(400).json({ message: "Password incorrect" });
        }
      });
    });
  },
};

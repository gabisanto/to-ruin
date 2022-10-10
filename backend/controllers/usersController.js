const { User } = require("../models");
const { Op } = require("sequelize");
const { generateToken } = require("../auth/token");

module.exports = {
  list: (req, res) => {
    User.findAll()
      .then((data) => res.send(data))
      .catch(() => res.sendStatus(404));
  },
  register: (req, res) => {
    User.findOne({
      where: {
        [Op.or]: [{ email: req.body.email }, { username: req.body.username }],
      },
    }).then((userFound) => {
      userFound
        ? res.send({ error: "User already exists" })
        : User.create(req.body)
            .then((user) => {
              res.status(201).send(user);
            })
            .catch((error) => {
              res.status(400).send(error);
            });
    });
  },
  login: (req, res) => {
    const payload = {
      id: req.user.id,
      username: req.user.username,
      favorite_movie: req.user.favorite_movie,
      favorite_tv: req.user.favorite_tv,
      avatar: req.user.avatar,
      isAdmin: req.user.isAdmin,
    };

    const token = generateToken(payload);

    res.cookie("token", token);
    res.send(payload);
  },
  logout: (req, res) => {
    req.logOut(function (err) {
      if (err) {
        return console.log(err);
      }
      res.clearCookie("connect.sid", { path: "/" }).status(200).send("done");

      console.log("success");
    });
  },

  manageFavorite: (req, res) => {
    let type = req.params.media_type;
    User.findByPk(req.params.id)
      .then((user) => {
        let favorites =
          type === "movie" ? user.favorite_movie : user.favorite_tv;
        if (favorites.includes(String(req.body.id))) {
          favorites.splice(favorites.indexOf(String(req.body.id)), 1);
        } else {
          favorites.push(String(req.body.id));
        }
        return favorites;
      })
      .then((data) =>
        User.update(
          type === "movie" ? { favorite_movie: data } : { favorite_tv: data },
          { returning: true, where: { id: req.params.id } }
        ).then(([rowsUpdate, [updatedUser]]) => {
          const payload = {
            id: updatedUser.id,
            username: updatedUser.username,
            favorite_movie: updatedUser.favorite_movie,
            favorite_tv: updatedUser.favorite_tv,
            avatar: updatedUser.avatar,
            isAdmin: updatedUser.isAdmin,
          };
          res.send(payload);
        })
      );
  },

  fetchUser: (req, res) => {
    User.findByPk(req.params.id)
      .then((data) => {
        if (!data) {
          res.send({ error: "User not found" });
        } else {
          const payload = {
            id: data.id,
            username: data.username,
            email: data.email,
            favorite_movie: data.favorite_movie,
            favorite_tv: data.favorite_tv,
          };
          res.send(payload);
        }
      })
      .catch(() => res.send({ error: "User not found" }));
  },
};

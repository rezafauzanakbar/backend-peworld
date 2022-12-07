const userModel = require("../model/user.model");
const { success, failed } = require("../helper/response");

const userController = {
  // method
  list: async (req, res) => {
    const sort = req.query.sort;
    const asc = req.query.asc;
    const limit = Number(req.query.limit) || 3;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;
    const getUser = await userModel.selectAll(sort, asc, limit, offset);
    try {
      res.json(getUser);
    } catch (err) {
      res.json(err);
    }
  },
  listWithoutLimit: async (req, res) => {
    const getUser = await userModel.selectAllWithoutLimit();
    try {
      res.json(getUser);
    } catch (err) {
      res.json(err);
    }
  },
  detail: async (req, res) => {
    // method untuk menampilkan hanya satu id
    const id_user = req.params.id;
    const getUser = await userModel.selectDetail(id_user);
    try {
      res.json(getUser.rows);
    } catch (err) {
      res.json(err);
    }
  },
  update: async (req, res) => {
    const {
      name,
      email,
      phone,
      password,
      job_desk,
      title,
      city,
      skill,
      instagram,
      github,
      gitlab,
      portofolio,
      description,
    } = req.body;
    const id_user = req.params.id;
    const getUser = await userModel.update(
      id_user,
      name,
      email,
      phone,
      password,
      job_desk,
      title,
      city,
      skill,
      instagram,
      github,
      gitlab,
      portofolio,
      description
    );
    try {
      res.json(getUser);
    } catch (err) {
      res.json(err);
    }
  },
  updatePhoto: (req, res) => {
    const id_user = req.params.id;
    const photo = req.file.filename;
    userModel
      .updatePhoto(id_user, photo)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  },
  deleteUser: (req, res) => {
    const id_user = req.params.id;
    userModel
      .deleteUser(id_user)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  },
};

module.exports = userController;

const hireModel = require("../model/hire.model");
const { success, failed } = require("../helper/response");

const hireController = {
  // insert
  insert: (req, res) => {
    const { id_user, id_perekrut, name_project, description_project } =
      req.body;
    const data = {
      id_user,
      id_perekrut,
      name_project,
      description_project,
    };
    hireModel
      .insertHire(data)
      .then((result) => {
        success(res, result.rowCount, "success", "Insert hire Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to insert hire");
      });
  },

  //get all
  list: (req, res) => {
    hireModel
      .getAllHire()
      .then((result) => {
        success(res, result.rows, "success", "Get All hire List Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to get all hire list");
      });
  },

  //get all hire by user
  listByUser: (req, res) => {
    const id_user = req.params.id;
    hireModel
      .getAllHireByUser(id_user)
      .then((result) => {
        success(res, result.rows, "success", "Get All hire By User Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to get all hire by user");
      });
  },

  //get all hire by perekrut
  listByPerekrut: (req, res) => {
    const id_perekrut = req.params.id;
    hireModel
      .getAllHireByPerekrut(id_perekrut)
      .then((result) => {
        success(
          res,
          result.rows,
          "success",
          "Get All hire By Perekrut Success"
        );
      })
      .catch((err) => {
        failed(
          res,
          err.message,
          "failed",
          "Failed to get all hire by Perekrut"
        );
      });
  },
  destroy: (req, res) => {
    const id_hire = req.params.id;
    hireModel
      .deleteHire(id_hire)
      .then((result) => {
        success(res, result.rowCount, "success", "Delete hire Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to hire portofolio");
      });
  },
};

module.exports = hireController;

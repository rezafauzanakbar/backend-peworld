const portofolioModel = require("../model/portofolio.model");
const { success, failed } = require("../helper/response");
const cloudinary = require("../helper/cloudinary");

const userController = {
  list: (req, res) => {
    portofolioModel
      .getAllPortofolio()
      .then((result) => {
        success(res, result.rows, "success", "Get All Flight List Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to get all flight list");
      });
  },

  listByUser: (req, res) => {
    const id_user = req.params.id;
    portofolioModel
      .getAllPortofolioByUser(id_user)
      .then((result) => {
        success(
          res,
          result.rows,
          "success",
          "Get All Portofolio By User Success"
        );
      })
      .catch((err) => {
        failed(
          res,
          err.message,
          "failed",
          "Failed to get all Portofolio by user"
        );
      });
  },
  detail: (req, res) => {
    const id_portofolio = req.params.id;
    portofolioModel
      .getDetailPortofolio(id_portofolio)
      .then((result) => {
        success(res, result.rows, "success", "Get Detail portofolio success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to get detail portofolio");
      });
  },
  destroy: async (req, res) => {
    const id_portofolio = req.params.id;
    const data = await portofolioModel.getDetailPortofolio(id_portofolio);
    const public_id = data.rows[0].image_pub_id;
    if (public_id !== null) {
      await cloudinary.uploader.destroy(public_id);
    }
    await portofolioModel
      .deletePortofolio(id_portofolio)
      .then((result) => {
        success(res, result.rowCount, "success", "Delete portofolio Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to delete portofolio");
      });
  },
  insert: async (req, res) => {
    try {
      const image = await cloudinary.uploader.upload(req.file.path);
      const { id_user, title_portofolio, link, type } = req.body;
      // const image = req.file.filename;
      const data = {
        id_user,
        title_portofolio,
        image: image.original_filename,
        link,
        type,
        image_pub_id: image.public_id,
        image_url: image.url,
        image_secure_url: image.secure_url,
      };
      portofolioModel
        .insertPortofolio(data)
        .then((result) => {
          success(res, result.rows, "success", "Insert portofolio Success");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Failed to insert portofolio");
        });
    } catch (err) {
      console.log(err);
    }
  },
  updatePortofolio: (req, res) => {
    const id_portofolio = req.params.id;
    const image = req.file.filename;
    const { title_portofolio, link, type } = req.body;
    const data = {
      id_portofolio,
      title_portofolio,
      image,
      link,
      type,
    };
    portofolioModel
      .updatePortofolio(data)
      .then((result) => {
        success(res, result.rowCount, "success", "Update portofolio Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to update portofolio");
      });
  },
};

module.exports = userController;

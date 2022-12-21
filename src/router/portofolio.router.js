const express = require("express");
const {
  list,
  listByUser,
  detail,
  destroy,
  insert,
  updatePortofolio,
} = require("../controller/portofolio.controller");

// buat variabel dengan memanggil library express router
const router = express.Router();
const uploadImage = require("../middleware/upload_Image");
const deleteImage = require("../middleware/deleteImage");

const jwtAuth = require("../middleware/jwtAuth");

router
  .get("/portofolio", list)
  .get("/portofolio/user/:id", listByUser)
  .get("/portofolio/detail/:id", detail)
  .post("/portofolio/insert", uploadImage, insert)
  // .delete("/portofolio/delete/:id", deleteImage, destroy)
  .delete("/portofolio/delete/:id", destroy)
  .put("/portofolio/update/:id", deleteImage, uploadImage, updatePortofolio);

module.exports = router; // harus di ekspor agar bisa dipanggil di index

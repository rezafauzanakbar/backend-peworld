const express = require("express");
const {
  register,
  login,
  update,
  detail,
  list,
} = require("../controller/perekrut.controller");

// buat variabel dengan memanggil library express router
const router = express.Router();
const uploadPhoto = require("../middleware/upload_photo");
const deletePhoto = require("../middleware/deletePhoto");

const jwtAuth = require("../middleware/jwtAuth");

router
  .post("/register/perekrut", register)
  //login
  .post("/login/perekrut", login)
  .put("/perekrut/update/:id", update)
  .get("/perekrut/detail/:id", detail)
  .get("/perekrut", list);

module.exports = router; // harus di ekspor agar bisa dipanggil di index

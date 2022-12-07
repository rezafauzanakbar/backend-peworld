const express = require("express");
const {
  insert,
  list,
  listByUser,
  listByPerekrut,
  destroy,
} = require("../controller/hire.controller");

// buat variabel dengan memanggil library express router
const router = express.Router();
router
  .get("/hire", list)
  .get("/hire/user/:id", listByUser)
  .get("/hire/perekrut/:id", listByPerekrut)
  .post("/hire/insert", insert)
  .delete("/hire/delete/:id", destroy);

module.exports = router; // harus di ekspor agar bisa dipanggil di index

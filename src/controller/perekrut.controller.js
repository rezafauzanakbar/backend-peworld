const perekrutModel = require("../model/perekrut.model");
const { success, failed, succesWithToken } = require("../helper/response");

//deklare bcyrpt

const bcyrpt = require("bcrypt");
const jwtToken = require("../helper/generateJWT");

module.exports = {
  register: (req, res) => {
    try {
      //tangkap data dari body
      const {
        name_perekrut,
        email,
        perusahaan,
        jabatan,
        phone,
        password,
        level,
      } = req.body;
      // const gambar = req.file.filename;
      bcyrpt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, err.message, "failed", "fail hash password");
        }
        //console.log(hash)
        const data = {
          name_perekrut,
          email,
          perusahaan,
          jabatan,
          phone,
          password: hash,
          photo: req.file ? req.file.filename : "default.png",
          level,
        };
        perekrutModel
          .register(data)
          .then((result) => {
            success(res, result, "success", "register success");
          })
          .catch((err) => {
            failed(res, err.message, "failed", "register failed");
          });
      });
    } catch (err) {
      failed(res, err.message, "failed", "internal server error");
    }
  },
  login: (req, res) => {
    const { email, password } = req.body;
    perekrutModel
      .checkUsername(email)
      .then((result) => {
        // console.log(res.rows[0]);
        const perekrut = result.rows[0];
        if (result.rowCount > 0) {
          bcyrpt
            .compare(password, result.rows[0].password)
            .then(async (result) => {
              if (result) {
                const token = await jwtToken({
                  email: perekrut.email,
                });
                // console.log(token);
                succesWithToken(
                  res,
                  { token, data: perekrut },
                  "success",
                  "login success"
                );
              } else {
                //ketika password salah
                failed(res, null, "failed", "email atau password salah");
              }
            });
        } else {
          //ketika email salah
          failed(res, null, "failed", "email atau password salah");
        }
      })
      .catch((err) => {
        failed(res, err.message, "failed", "internal server error");
      });
  },
  update: (req, res) => {
    const {
      name_perekrut,
      email,
      perusahaan,
      jabatan,
      phone,
      address,
      description,
      instagram,
      lingkedin,
    } = req.body;
    const id_perekrut = req.params.id;
    perekrutModel
      .update(
        id_perekrut,
        name_perekrut,
        email,
        perusahaan,
        jabatan,
        phone,
        address,
        description,
        instagram,
        lingkedin
      )
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  },
  detail: (req, res) => {
    const id_perekrut = req.params.id;
    perekrutModel
      .selectDetail(id_perekrut)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  },
  list: (req, res) => {
    perekrutModel
      .selectAll()
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        res.json(error);
      });
  },
};

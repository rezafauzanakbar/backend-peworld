const db = require("../config/db");
const perekrutModel = {
  //model register
  register: ({
    name_perekrut,
    email,
    perusahaan,
    jabatan,
    phone,
    password,
    photo,
    level,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO perekrut (name_perekrut, email, perusahaan, jabatan, phone, password, photo, level) VALUES ('${name_perekrut}', '${email}', '${perusahaan}', '${jabatan}', '${phone}', '${password}', '${photo}', ${level})`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  //model login
  checkUsername: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM perekrut WHERE email = '${email}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  update: (
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
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE perekrut SET
      name_perekrut = COALESCE($1, name_perekrut),
      email = COALESCE($2, email),
      perusahaan = COALESCE($3, perusahaan),
      jabatan = COALESCE($4, jabatan),
      phone = COALESCE($5, phone),
      address = COALESCE($6, address),
      description = COALESCE($7, description),
      instagram = COALESCE($8, instagram),
      linkedin = COALESCE($9, linkedin)
      WHERE id_perekrut = $10`,
        [
          name_perekrut,
          email,
          perusahaan,
          jabatan,
          phone,
          address,
          description,
          instagram,
          lingkedin,
          id_perekrut,
        ],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  updatePhoto: (id_perekrut, photo) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE perekrut SET photo = '${photo}' WHERE id_perekrut = ${id_perekrut}`
      )
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  selectDetail: (id_perekrut) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM perekrut WHERE id_perekrut=${id_perekrut}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  selectDetail: (id_perekrut) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM perekrut WHERE id_perekrut=${id_perekrut}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM perekrut`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = perekrutModel;

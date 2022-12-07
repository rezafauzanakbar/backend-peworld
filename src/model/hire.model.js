const db = require("../config/db");
const hireModel = {
  insertHire: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO hire (id_user, id_perekrut, name_project, description_project) VALUES (${data.id_user}, ${data.id_perekrut}, '${data.name_project}', '${data.description_project}');`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //get all
  getAllHire: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM hire join users on hire.id_user = users.id_user join perekrut on hire.id_perekrut = perekrut.id_perekrut;`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //get all hire berdasarkan user
  getAllHireByUser: (id_user) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM hire join users on hire.id_user = users.id_user WHERE hire.id_user = ${id_user};`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //get all hire berdasarkan perekrut
  getAllHireByPerekrut: (id_perekrut) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM hire join perekrut on hire.id_perekrut = perekrut.id_perekrut WHERE hire.id_perekrut = ${id_perekrut};`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //delete hire by perekrut
  deleteHire: (id_hire) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM hire WHERE id_hire='${id_hire}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = hireModel;

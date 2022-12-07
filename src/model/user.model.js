const db = require("../config/db");
const userModel = {
  selectAll: (sort, asc, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users ORDER BY ${sort} ${asc} LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
  selectAllWithoutLimit: () => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  // router details
  selectDetail: (id_user) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id_user=${id_user}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  // router update
  update: (
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
    description,
    photo
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        phone = COALESCE($3, phone),
        password = COALESCE($4, password),
        job_desk = COALESCE($5, job_desk),
        title = COALESCE($6, title),
        city = COALESCE($7, city),
        skill = COALESCE($8, skill),
        instagram = COALESCE($9, instagram),
        github = COALESCE($10, github),
        gitlab = COALESCE($11, gitlab),
        portofolio = COALESCE($12, portofolio),
        description = COALESCE($13, description),
        photo = COALESCE($14, photo)
        WHERE id_user = $15`,
        [
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
          photo,
          id_user,
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

  updatePhoto: (id_user, photo) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET photo = '${photo}' WHERE id_user = ${id_user}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  deleteUser: (id_user) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id_user = ${id_user}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  //model register
  register: ({ name, email, phone, password, photo }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (name, email, phone, password, photo) VALUES ('${name}', '${email}', '${phone}', '${password}', '${photo}')`,
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
      db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

module.exports = userModel;

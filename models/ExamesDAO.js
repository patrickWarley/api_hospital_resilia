import mysql from "mysql";
import { mysqlconfigDev } from "../config/mysql.config.js";

const tablename = "exames";

function getConnection() {
  return mysql.createConnection(mysqlconfigDev);
}

export default {
  list: function () {
    return new Promise(function (resolve, reject) {
      const con = getConnection();
      con.connect(err => {
        //if there is no error execute the query
        if (err) reject(err);

        const sql = "SELECT * FROM exames";
        con.query(sql, (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
      });
    });
  },
  executeQuery: function (query) {
    return new Promise(function (resolve, reject) {
      const con = getConnection();
      con.connect(err => {
        if (err) reject(err);

        con.query(query, (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
      });
    });
  },
  create: function (exame) {
    return new Promise(function (resolve, reject) {
      const con = getConnection();
      //start the connection
      con.connect(err => {
        if (err) reject(err);

        const sql = "INSERT INTO exames SET ?";

        con.query(sql, exame, (err, result) => {
          if (err) reject(err)

          resolve(result);
        });
      });
    });
  },
  getById: function (id) {
    return new Promise(function (resolve, reject) {
      const con = getConnection();

      con.connect(err => {
        if (err) reject(err);

        const sql = "SELECT * FROM exames WHERE id = ?";

        con.query(sql, [id], (err, result) => {
          if (err) reject(err);

          resolve(result[0]);
        });
      })
    })
  },
  update: function (id, exame) {
    return new Promise(function (resolve, reject) {
      const con = getConnection();

      con.connect(err => {
        if (err) reject(err);

        //get the old data
        const sql = "SELECT * FROM exames WHERE id = ?";
        con.query(sql, [id], (err, result) => {
          if (err) reject(err);

          const newData = { ...result[0], ...exame };

          const setQuery = "UPDATE exames SET ? WHERE ID = ?";
          con.query(setQuery, [newData, id], (err, result) => {
            if (err) reject(err);

            resolve(newData);
          })
        })
      })
    })
  },
  delete: function (id) {
    return new Promise((resolve, reject) => {

      const con = getConnection();
      con.connect(err => {
        if (err) reject(err);

        const sql = `DELETE FROM exames WHERE id = ?`
        con.query(sql, [id], (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
      })
    })
  }
};
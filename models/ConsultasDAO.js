import mysql from "mysql";
import { mysqlconfigDev } from "../config/mysql.config.js";

const tablename = "consultas";

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

        const sql = "SELECT * FROM consultas";
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
  create: function (consulta) {
    return new Promise(function (resolve, reject) {
      const con = getConnection();
      //start the connection
      con.connect(err => {
        if (err) reject(err);

        const sql = "INSERT INTO consultas SET ?";

        con.query(sql, consulta, (err, result) => {
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

        const sql = "SELECT * FROM consultas WHERE id = ?";

        con.query(sql, [id], (err, result) => {
          if (err) reject(err);

          resolve(result[0]);
        });
      })
    })
  },
  update: function (id, consulta) {
    return new Promise(function (resolve, reject) {
      const con = getConnection();

      con.connect(err => {
        if (err) reject(err);

        //get the old data
        const sql = "SELECT * FROM consultas WHERE id = ?";
        con.query(sql, [id], (err, result) => {
          if (err) reject(err);

          const newData = { ...result[0], ...consulta };

          const setQuery = "UPDATE consultas SET ? WHERE ID = ?";
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

        const sql = `DELETE FROM consultas WHERE id = ?`
        con.query(sql, [id], (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
      })
    })
  }
};
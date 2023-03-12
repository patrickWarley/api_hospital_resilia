import mysql from "mysql";
import { mysqlconfigDev } from "../config/mysql.config.js";

const tablename = "pacientes";

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

        const sql = "SELECT * FROM pacientes";
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
  create: function (paciente) {
    return new Promise(function (resolve, reject) {
      const con = getConnection();
      //start the connection
      con.connect(err => {
        if (err) reject(err);

        const sql = "INSERT INTO pacientes SET ?";

        con.query(sql, paciente, (err, result) => {
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

        const sql = "SELECT * FROM pacientes WHERE id = ?";

        con.query(sql, [id], (err, result) => {
          if (err) reject(err);

          resolve(result[0]);
        });
      })
    })
  },
  update: function (id, paciente) {
    return new Promise(function (resolve, reject) {
      const con = getConnection();

      con.connect(err => {
        if (err) reject(err);

        //get the old data
        const sql = "SELECT * FROM pacientes WHERE id = ?";
        con.query(sql, [id], (err, result) => {
          if (err) reject(err);

          const newData = { ...result[0], ...paciente };

          const setQuery = "UPDATE pacientes SET ? WHERE ID = ?";
          con.query(setQuery, [paciente, id], (err, result) => {
            if (err) reject(err);

            resolve(newData);
          })
        })
      })
    })
  },
  delete: function (id) {
    return new Promise((resolve, reject) => {

      //remover do estoque
      const con = getConnection();
      con.connect(err => {
        if (err) reject(err);

        const sql = `DELETE FROM pacientes WHERE id = ?`
        con.query(sql, [id], (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
      })
    })
  }
};
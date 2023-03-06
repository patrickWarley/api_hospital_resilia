import pg from "pg";

const { Pool } = pg;
const tablename = "medicamentos";
//function to get the connection with the database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hospital_resilia',
  password: 'oo25oo25',
  port: 5432,
});

export default {
  listMedicamentos: function () {
    return new Promise(function (resolve, reject) {

      const sql = 'SELECT * FROM medicamentos';
      pool.query(sql, (err, result) => {

        if (err) reject(err);

        console.log(result.rows)
        return resolve(result.rows);
      })
    })
  }
  ,
  executeQuery: function (query) {
    return new Promise((resolve, reject) => {
      pool.query(query, (err, result) => {
        if (err) reject(err);

        return resolve(result.rows);
      })
    })
  }
  ,
  createMedicamento: function (medicamento) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${tablename} SET nome = $1, valor =$2, lote=$3, validade=$4, qtd_estoque=$5`;
      const values = [medicamento.nome, medicamento.valor, medicamento.lote, medicamento.validade, medicamento.qtd_estoque];
      pool.query(sql, values, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    })
  },
  getMedicamentoById: function (id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${tablename} WHERE id = ?`
      pool.query(sql, [id], (err, result) => {
        if (err) reject(err);

        resolve(result.rows);
      })
    });
  },
  updateMedicamento: function (id, medicamento) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${tablename} WHERE id = ?`
      pool.query(sql, [id], (err, result) => {
        if (err) reject(err);

        const updatedMedicamento = { ...result.rows[0], ...medicamento };

        const sql2 = `UPDATE ${tablename} SET ? WHERE id=?`;
        pool.query(sql2, [updatedMedicamento, id], (err, result) => {
          if (err) reject(err);

          resolve(updatedMedicamento);
        })
      })
    })
  },
  deleteMedicamento: function (id) {
    return new Promise((resolve, reject) => {

      //remover do estoque
      const sql = `DELETE FROM ${tablename} WHERE id = ?`
      pool.query(sql, [id], (err, result) => {
        if (err) reject(err);

        resolve(result);
      })
    })
  }
}
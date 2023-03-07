import pg from "pg";
const { Pool } = pg;

//function to get the connection with the database
//what is a pool and why use it? It's a pool of available connections
//technically you need to open and close a connection after each operation, but not without it's costs
//the decrease the amount resources you wasted openning and closing connections it may be interesting to keep a pool of available connections open.

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hospital_resilia',
  password: 'oo25oo25',
  port: 5432,
});

const tablename = "medicamentos";

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
      const sql = `INSERT INTO medicamentos SET nome = $1, valor =$2, lote=$3, validade=$4, qtd_estoque=$5`;
      const values = [medicamento.nome, medicamento.valor, medicamento.lote, medicamento.validade, medicamento.qtd_estoque];
      pool.query(sql, values, (err, result) => {
        if (err) reject(err);

        resolve(result);
      });
    })
  },
  getMedicamentoById: function (id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM medicamentos WHERE id = ?`
      pool.query(sql, [id], (err, result) => {
        if (err) reject(err);

        resolve(result.rows);
      })
    });
  },
  updateMedicamento: function (id, medicamento) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM medicamentos WHERE id = ?`
      pool.query(sql, [id], (err, result) => {
        if (err) reject(err);

        const updatedMedicamento = { ...result.rows[0], ...medicamento };
        
        const sql2 = `INSERT INTO medicamentos SET nome = $1, valor =$2, lote=$3, validade=$4, qtd_estoque=$5 WHERE id = ?`;
        const values = [
          medicamento.nome,
          medicamento.valor,
          medicamento.lote,
          medicamento.validade,
          medicamento.qtd_estoque,
          medicamento.id
        ];

        pool.query(sql2, values, (err, result) => {
          if (err) reject(err);

          resolve(updatedMedicamento);
        })
      })
    })
  },
  
  deleteMedicamento: function (id) {
    return new Promise((resolve, reject) => {

      //remover do estoque
      const sql = `DELETE FROM medicamentos WHERE id = ?`
      pool.query(sql, [id], (err, result) => {
        if (err) reject(err);

        resolve(result);
      })
    })
  }
}
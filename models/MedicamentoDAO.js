import mysql from 'mysql';
import { mysqlconfig } from '../config/mysql.config.js';

const tablename = "medicamentos";
//function to get the connection with the database
function getConnection(){
  return mysql.createConnection(mysqlconfig)
}

export default {
  listMedicamentos: function(){
      return new Promise(function(resolve, reject){
        const con = getConnection();
        con.connect(err =>{
      
        if(err) reject(err);
      
        const sql = 'SELECT * FROM medicamentos';
        con.query(sql, (err, result) => {
      
          if(err) reject(err);

          return resolve(result);
        })
      })
    })
  },
  executeQuery: function(query){
    return new Promise((resolve, reject) =>{
      const con = getConnection();
      con.connect(err =>{
        if(err) reject(err);

        con.query(query, (err, result) =>{
          if(err) reject(err);

          return resolve(result);
        })
      })
    })
  },
  createMedicamento: function(medicamento){
    return new Promise((resolve, reject) => {
      const con = getConnection();
      con.connect(err =>{
        //shit happens
        if(err) reject(err);

        const sql = `INSERT INTO ${tablename} SET ?`;
        con.query(sql, medicamento, (err, result) => {
          if(err) reject(err);
          
          resolve(result);
        });
      })    
    })
  },
  getMedicamentoById:function(id){
    return new Promise((resolve, reject)=>{
      const con = getConnection();
      con.connect(err =>{
        if(err) reject(err);

        const sql= `SELECT * FROM ${tablename} WHERE id = ?`
        con.query(sql, [id], (err, result) =>{
          if(err) reject(err);
          
          resolve(result);
        })
      })
    });
  },
  updateMedicamento:function(id, medicamento){
    return new Promise((resolve, reject) =>{
      const con = getConnection();
      con.connect(err => {
        if(err) reject(err);

        const sql = `SELECT * FROM ${tablename} WHERE id = ?`
        con.query(sql, [id], (err, result) => {
          if(err) reject(err);

          const updatedMedicamento = {...result[0], ...medicamento};

          const sql2 = `UPDATE ${tablename} SET ? WHERE id=?`;
          con.query(sql2,[updatedMedicamento, id], (err, result) => {
            if(err) reject(err);

            resolve(updatedMedicamento);
          })
        })
      })
    })
  },
  deleteMedicamento:function(id){
    return new Promise((resolve, reject) =>{

      //remover do estoque
      const con = getConnection();
      con.connect(err => {
        if(err)reject(err);

        const sql = `DELETE FROM ${tablename} WHERE id = ?`
        con.query(sql, [id], (err, result) =>{
          if(err) reject(err);
          
          resolve(result);
        })
      })
    })
  }
}
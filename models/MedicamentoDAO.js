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
        con.query(sql, (err, result, fields) => {
      
          if(err) reject(err);

          return resolve(result);
        })
      })
    })
  },
  executeQuery: function(){},
  createMedicamento: function(...medicamento){
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
  updateMedicamento:function(){},
  deleteMedicamento:function(){}
}
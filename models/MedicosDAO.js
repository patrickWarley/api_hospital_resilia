import mysql from "mysql";
import { mysqlconfigDev } from "../config/mysql.config.js";

const tablename = "medicos";

function getConnection(){
  return mysql.createConnection(mysqlconfigDev);
}

export default{
list:function(){
        return new Promise(function(resolve, reject){
        const con = getConnection();
        con.connect(err =>{
          //if there is no error execute the query
          if(err) reject(err);

          const sql = "SELECT * FROM medicos";
          con.query(sql, (err, result) =>{
            if(err)reject(err);

            resolve(result);
          })
        });
      });
},
executeQuery: function(query){
return new Promise(function(resolve, reject){
  const con = getConnection();
  con.connect(err =>{
    if(err) reject(err);
    
    con.query(query, (err, result) => {
      if(err)reject(err);

      resolve(result);
    })
  });
});
},
create:function(medico){
  return new Promise(function(resolve, reject){
    const con = getConnection();
    //start the connection
    con.connect(err =>{
      if(err) reject(err);

      const sql = "INSERT INTO medicos SET ?";

      con.query(sql, medico, (err, result) =>{
        if(err) reject(err)

        resolve(result);
      });
    });
  });
},
getById:function(id){
  return new Promise(function(resolve, reject){
    const con = getConnection();

    con.connect(err => {
      if(err) reject(err);

      const sql = "SELECT * FROM medicos WHERE id = ?";

      con.query(sql, [id], (err, result)=>{
        if(err) reject(err);

        resolve(result);
      });
    })
  })
},
update:function(medico, id){
  return new Promise(function(resolve, reject){
    const con = getConnection();

    con.connect(err =>{
      if(err) reject(err);

      //get the old data
      const sql = "SELECT * FROM medicos WHERE id = ?";
      con.query(sql, [id], (err, result)=>{
        if(err) reject(err);

        const newData = {...result[0], ...medico};

        const setQuery = "UPDATE medicos SET ? WHERE ID = ?";
        con.query(setQuery, [medico, id], (err, result)=>{
          if(err) reject(err);

          resolve(result);
        })
      })
    })
  })
},
delete:function (id) {
    return new Promise((resolve, reject) => {

      //remover do estoque
      const con = getConnection();
      con.connect(err => {
        if (err) reject(err);

        const sql = `DELETE FROM medicos WHERE id = ?`
        con.query(sql, [id], (err, result) => {
          if (err) reject(err);

          resolve(result);
        })
      })
    })
  }
};
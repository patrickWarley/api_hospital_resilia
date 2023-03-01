 import express from 'express';
 import MedicamentoDAO from '../models/MedicamentoDAO.js';
 const router = express.Router();
 //create a router

 router.get('/',(req,res) =>{
  
  MedicamentoDAO.listMedicamentos()
  .then(medicamentos =>  res.json(medicamentos))
  .catch(err =>  console.log(err));
 })

 router.post('/',(req, res)=>{
  const { medicamento } = req.body;
  
  MedicamentoDAO.createMedicamento(medicamento)
  .then(result => res.json(result))
  .catch(err => {
    console.log(err)
    res.status(500).json({mensagem:"Algum erro ocorreu!"})
  })
 })

 export default router;
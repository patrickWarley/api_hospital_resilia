import express from 'express';
import MedicamentoDAO from '../models/MedicamentoDAO.js';
//import MedicamentoDAO from '../models/MedicamentoDAOPostgres.js';
const router = express.Router();

const errorMsg = "Algum erro inesperado ocorreu esper alguns instantes e tente novamente!"; 

//create a router
router.get('/', (req, res) => {
  MedicamentoDAO.list()
    .then((medicamentos) => res.json(medicamentos))
    .catch((err) => res.status(500).json({ error: true, mensagem:errorMsg }));
  })

router.post('/', (req, res) => {
  const { medicamento } = req.body;

  MedicamentoDAO.create(medicamento)
    .then(result => res.json({mensagem:"Medicamento cadastrado com sucesso!"}))
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: true, mensagem: errorMsg })
      });
})

router.get('/:id', (req, res) => {
  const { id } = req.params;

  MedicamentoDAO.getById(id)
    .then((medicamento) => res.json(medicamento))
    .catch((err) =>{
        console.log(err);
        res.status(500).json({ error: true, mensagem: errorMsg});
      });
});

//del
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  MedicamentoDAO.delete(id)
    .then(result => res.status(200).json({ mensagem: "Medicamento excluido com sucesso!" }))
    .catch(err => {
      console.log(err);
      res.status(500).json({erro:true, mensagem:errorMsg})
    });

});

//update
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { medicamento } = req.body;

  MedicamentoDAO.update(id, medicamento)
    .then(result => res.status(200).json({mensagem: "Medicamento atualizado com sucesso!"}))
    .catch(err => {
      console.log(err)
      res.status(500).json({error:true, mensagem:errorMsg})
    });
});

export default router;
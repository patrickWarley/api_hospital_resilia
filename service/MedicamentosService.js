import express from 'express';
import MedicamentoDAO from '../models/MedicamentoDAO.js';
//import MedicamentoDAO from '../models/MedicamentoDAOPostgres.js';
const router = express.Router();

//create a router
router.get('/', (req, res) => {
  MedicamentoDAO.listMedicamentos()
    .then((medicamentos) => res.json(medicamentos))
    .catch((err) => res.status(500).json({ error: true }));
  })

router.post('/', (req, res) => {
  const { medicamento } = req.body;

  MedicamentoDAO.createMedicamento(medicamento)
    .then(result => res.json({mensagem:"Medicamento cadastrado com sucesso!"}))
    .catch(err =>{
        console.log(err);
        res.status(500).json({ error: true })
      });
})

router.get('/:id', (req, res) => {
  const { id } = req.params;

  MedicamentoDAO.getMedicamentoById(id)
    .then((medicamento) => res.json(medicamento))
    .catch((err) =>{
        console.log(err);
        res.status(500).json({ error: true });
      });
});

//del
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  MedicamentoDAO.deleteMedicamento(id)
    .then(result => res.status(200).json({ mensagem: "Medicamento excluido com sucesso!" }))
    .catch(err => {
      console.log(err);
      res.status(500).json({erro:true})
    });

});

//update
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { medicamento } = req.body;

  MedicamentoDAO.updateMedicamento(id, medicamento)
    .then(result => res.status(200).json({mensagem: "Medicamento atualizado com sucesso!"}))
    .catch(err => {
      console.log(err)
      res.status(500).json({error:true})
    });
});

export default router;
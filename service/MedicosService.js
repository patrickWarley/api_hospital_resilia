import express from "express";
import MedicosDAO from "../models/MedicosDAO";

const router = express.Router();

const errorMsg =
  "Algum erro inesperado ocorreu esper alguns instantes e tente novamente!";

//create a router
router.get("/", (req, res) => {
  MedicosDAO.listMedicos()
    .then((medicos) => res.json(medicos))
    .catch((err) => res.status(500).json({ error: true, mensagem: errorMsg }));
});

router.post("/", (req, res) => {
  const { medico } = req.body;

  MedicosDAO.createmedico(medico)
    .then((result) =>
      res.json({ mensagem: "Medico cadastrado com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  MedicosDAO.getmedicoById(id)
    .then((medico) => res.json(medico))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

//del
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  MedicosDAO.deletemedico(id)
    .then((result) =>
      res.status(200).json({ mensagem: "Medico excluido com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ erro: true, mensagem: errorMsg });
    });
});

//update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { medico } = req.body;

  MedicosDAO.updatemedico(id, medico)
    .then((result) =>
      res.status(200).json({ mensagem: "Medico atualizado com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

export default router;

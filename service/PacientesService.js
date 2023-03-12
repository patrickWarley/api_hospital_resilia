import express from "express";
import PacientesDAO from "../models/PacientesDAO.js";

const router = express.Router();

const errorMsg =
  "Algum erro inesperado ocorreu esper alguns instantes e tente novamente!";

//create a router
router.get("/", (req, res) => {
  PacientesDAO.list()
    .then((pacientes) => res.json(pacientes))
    .catch((err) => res.status(500).json({ error: true, mensagem: errorMsg }));
});

router.post("/", (req, res) => {
  const { paciente } = req.body;
  PacientesDAO.create(paciente)
    .then((result) =>
      res.json({ mensagem: "Paciente cadastrado com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  PacientesDAO.getById(id)
    .then((paciente) => res.json(paciente))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

//del
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  PacientesDAO.delete(id)
    .then((result) =>
      res.status(200).json({ mensagem: "Paciente excluido com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ erro: true, mensagem: errorMsg });
    });
});

//update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { paciente } = req.body;

  PacientesDAO.update(id, paciente)
    .then((result) =>
      res.status(200).json({ mensagem: "Paciente atualizado com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

export default router;

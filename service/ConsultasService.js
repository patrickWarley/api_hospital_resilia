import express from "express";
import ConsultasDAO from "../models/ConsultasDAO.js";

const router = express.Router();

const errorMsg =
  "Algum erro inesperado ocorreu esper alguns instantes e tente novamente!";

//create a router
router.get("/", (req, res) => {
  ConsultasDAO.list()
    .then((consultas) => res.json(consultas))
    .catch((err) => res.status(500).json({ error: true, mensagem: errorMsg }));
});

router.post("/", (req, res) => {
  const { consulta } = req.body;
  ConsultasDAO.create(consulta)
    .then((result) =>
      res.json({ mensagem: "Consulta cadastrada com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  ConsultasDAO.getById(id)
    .then((consulta) => {
      res.json(consulta)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

//del
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  console.log(id);
  ConsultasDAO.delete(id)
    .then((result) =>
      res.status(200).json({ mensagem: "Consulta excluida com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ erro: true, mensagem: errorMsg });
    });
});

//update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { consulta } = req.body;

  console.log(id, consulta)

  ConsultasDAO.update(id, consulta)
    .then((result) =>
      res.status(200).json({ mensagem: "Consulta atualizada com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

export default router;

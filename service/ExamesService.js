import express from "express";
import ExamesDAO from "../models/ExamesDAO.js";

const router = express.Router();

const errorMsg =
  "Algum erro inesperado ocorreu esper alguns instantes e tente novamente!";

//create a router
router.get("/", (req, res) => {
  ExamesDAO.list()
    .then((exames) => res.json(exames))
    .catch((err) => res.status(500).json({ error: true, mensagem: errorMsg }));
});

router.post("/", (req, res) => {
  const { exame } = req.body;
  ExamesDAO.create(exame)
    .then((result) =>
      res.json({ mensagem: "Exame cadastrado com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  ExamesDAO.getById(id)
    .then((exame) => {
      res.json(exame)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

//del
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  ExamesDAO.delete(id)
    .then((result) =>
      res.status(200).json({ mensagem: "Exame excluido com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ erro: true, mensagem: errorMsg });
    });
});

//update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { exame } = req.body;

  console.log(id, exame)

  ExamesDAO.update(id, exame)
    .then((result) =>
      res.status(200).json({ mensagem: "Exame atualizado com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

export default router;

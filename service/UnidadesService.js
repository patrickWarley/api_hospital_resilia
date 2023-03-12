import express from "express";
import UnidadesDAO from "../models/UnidadesDAO.js";

const router = express.Router();

const errorMsg =
  "Algum erro inesperado ocorreu esper alguns instantes e tente novamente!";

//create a router
router.get("/", (req, res) => {
  UnidadesDAO.list()
    .then((unidades) => res.json(unidades))
    .catch((err) => res.status(500).json({ error: true, mensagem: errorMsg }));
});

router.post("/", (req, res) => {
  const { unidade } = req.body;
  UnidadesDAO.create(unidade)
    .then((result) =>
      res.json({ mensagem: "Unidade cadastrada com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  UnidadesDAO.getById(id)
    .then((unidade) => res.json(unidade))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

//del
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  UnidadesDAO.delete(id)
    .then((result) =>
      res.status(200).json({ mensagem: "Unidade excluida com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ erro: true, mensagem: errorMsg });
    });
});

//update
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { unidade } = req.body;

  console.log("SERVICE:", unidade)

  UnidadesDAO.update(id, unidade)
    .then((result) =>
      res.status(200).json({ mensagem: "Unidade atualizada com sucesso!" })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: true, mensagem: errorMsg });
    });
});

export default router;

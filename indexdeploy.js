import express from "express";
import multer from "multer";
import cors from "cors";

import MedicamentosService from "./service/MedicamentosService.js";
import MedicosService from "./service/MedicosService.js";
import PacientesService from "./service/PacientesService.js";
import UnidadesService from "./service/UnidadesService.js";

//necessario para recuperar o diretorio
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = "3000";

const app = express();
const upload = multer();

//defino a pasta com os arquivos staticos
app.use(express.static(path.resolve(__dirname, '../client/dist')))

//json
app.use(express.json());

//forms
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use("/medicamentosAPI", MedicamentosService);
app.use("/medicosAPI", MedicosService);
app.use("/pacientesAPI", PacientesService);
app.use("/unidadesAPI", UnidadesService);
//cors
app.use(cors());

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
})
// I still need to configure this server to work with react

app.listen(port, () => {
  console.log("Servidor funcionando!");
});

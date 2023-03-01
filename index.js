import express from "express";
import MedicamentosService from './service/MedicamentosService.js'
import multer from "multer";
const port="3000";

const app = express();
const upload = multer();

app.get('/', (req, res) => {
  res.send('Servidor Online');
});

//json
app.use(express.json());

//forms
app.use(express.urlencoded({extended:true}))
app.use(upload.array());

app.use('/medicamentos', MedicamentosService);

// I still need to configure this server to work with react


app.listen(port,() =>{
  console.log('Servidor funcionando!');
});

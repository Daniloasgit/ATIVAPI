const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/',(req,res) =>{
    res.send ('servidor ativo com sucesso');
});



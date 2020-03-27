const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');


const app = express();

mongoose.connect('mongodb+srv://beto22ufc:G11b33t011ma@cluster0-gzhkx.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

//Query params: request.query (Filtros, ordenação, paginação)
//Route Params: request.params (Identificação de um recurso)
//Body: requst.body (Dados para cricação ou alteração de um registro)


app.listen(3333);

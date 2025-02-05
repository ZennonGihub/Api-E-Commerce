//Traer y utilizar express
const express = require('express')
const routerApi = require('./routes');
const cors = require('cors')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

app.use(express.json())
const array = ['http://127.0.0.1:5500']
app.use(cors());

//Definir una ruta
app.get('/San-Luis', (req, res) => {
    res.json('Hello world')
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);

//Tenemos que hacer que el sv 'escuche'
app.listen(port, () => {
  console.log('Mi puerto es:' + port)
})

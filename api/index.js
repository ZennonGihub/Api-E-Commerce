//Traer y utilizar express
const express = require('express')
const routerApi = require('./routes/index.router');
const cors = require('cors')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port =  process.env.PORT || 3000;

app.use(express.json())

const whitelist = ['http://127.0.0.1:5500']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}

app.use(cors(options));
//Definir una ruta

app.get('/api', (req, res) => {
    res.send('Esta funcionando')
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler);

//Tenemos que hacer que el sv 'escuche'
app.listen(port, () => {
  console.log('Mi puerto es:' + port)
})

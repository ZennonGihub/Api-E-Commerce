const express = require('express');
const routerApi = require('./../src/routes/index.router');
const cors = require('cors');
const { checkApiKey } = require('./../src/middlewares/auth.handler');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('openapi.yaml');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./../src/middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

app.use(cors(options));
require('./../src/util/index');

app.get('/api', checkApiKey, (req, res) => {
  res.send('Esta funcionando');
});

routerApi(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

module.exports = app;

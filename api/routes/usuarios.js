const express = require('express')
const { faker } = require('@faker-js/faker')

const router = express.Router();

router.get('/Lista', (req, res) => {
  res.json([{

  }])
})


module.exports = router;

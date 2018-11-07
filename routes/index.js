const express = require('express');
const router = express.Router();
const {user,product} = require('../db/models')

/* GET home page. */
router.get('/', async function(req, res, next) {

  const data = await product.findAll({
    include:[user,product]
  })
  res.json(data);
});

module.exports = router;

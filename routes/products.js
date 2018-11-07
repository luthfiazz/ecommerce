const express = require('express');
const router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const {
  User,
  Product,
  Detailproduct
} = require('../db/models');
const passport = require('../helper/auth');

/* GET products listing. */

router.get('/', passport.authenticate('jwt'), async (req, res) => {
  const {
    id
  } = req.user
  // console.log('aaa',req.user)
  const data = await Product.findAll({
    include: User,
    where: {
      id_user: id
    }

  })
  res.json(data);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const data = await Product.findOne({
    where: {
      id_user: id
    }
  })
  res.json(data);
});

router.post('/', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true
    })
  }
});

/* POST products listing. */
router.post('/', passport.authenticate('jwt'), async (req, res) => {
  const {
    picture,
    name,
    size,
    material,
    price,
    discount
  } = req.body
  const {
    id
  } = req.user
  console.log(id)
  const data = await Product.create({
    picture,
    name,
    size,
    material,
    price,
    discount,
    id_user: id
  })
  res.json(data)
})

/* PUT products listing. */
router.put('/:id', async (req, res) => {
  const {
    id
  } = req.params
  const {
    picture,
    name,
    size,
    material,
    price,
    discount
  } = req.body

  const data = await Product.update({
    picture,
    name,
    size,
    material,
    price,
    discount
  }, {
    where: {
      id_user: id
    }
  })
  res.json(data)
  console.log('Success')
})

/* DELETE products listing. */
router.delete('/:id', async (req, res) => {
  const {
    id
  } = req.params

  console.log(req.params)
  const data = await Product.destroy({
    where: {
      id: id
    }
  })
  res.json(data)
  console.log('Success')
})


module.exports = router;
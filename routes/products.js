const express = require('express');
const router = express.Router();
const passport = require('../helper/auth');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  }
});
const {
  User,
  Product,
  Detailproduct
} = require('../db/models');

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 *5
  },
  fileFilter: fileFilter
});
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


/* POST products listing. */
router.post('/',passport.authenticate('jwt'), upload.single('picture'), async (req, res) => {
  console.log('aaa',req.file);
  const picture =req.file.originalname
  const {
    name,
    size,
    material,
    price,
    discount,
    stock,
    quantity,
    weight,
    color,
    description
  } = req.body
  
  const {
    id
  } = req.user
  
  console.log(req.body)
  const data = await Product.create({
    picture,
    name,
    size,
    material,
    price,
    discount,
    id_user: id
  })
  const data2 = await Detailproduct.create({
    stock,
    quantity,
    weight,
    color,
    description,
    id:data.id
    
  })
  // console.log('ssss',data);
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });
  } else {
    console.log('file received');
    return res.send({
      success:true,
      data,data2
    })
  }
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
      id: id
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

  const data = await Product.destroy({
    where: {
      id: id
    }
  })
  res.json(data)
  console.log('Success')
})


module.exports = router;
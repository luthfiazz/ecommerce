const express = require('express');
const router = express.Router();
const {User,Product,Detailproduct} = require('../db/models')
const passsport = require('../helper/auth')

/* GET detailproduct listing. */
router.get('/', async (req, res)=> {
 const {id} = req.user
 const data = await Detailproduct.findAll({
   include : User,
   where :{
     id_user:id
   }
 })
 res.json(data)
});

router.get('/:id', async (req,res)=>{
  const id = req.params.id
  const data = await Product.findOne({
    where:{id_user:id}
  })
  res.json(data);
})

router.post('/', async (req,res)=>{
  const {
    stock,
    quantity,
    weight,
    color,
    deskription
  }=req.body
  const{id}=req.user
  console.log(id)
  const data = await Detailproduct.create({
    stock,
    quantity,
    weight,
    color,
    deskription
  })
  res.json(data)
})

router.put('/:id', async (req,res)=>{
  const {id}= req.params
  const {
    stock,
    quantity,
    weight,
    color,
    deskription
  } =req.body
  const data = await Detailproduct.update({
    stock,
    quantity,
    weight,
    color,
    deskription
  },{
    where : {id_user:id}
  }) 
    res.json(data)
    console.log('Success')
})

router.delete('/:id', async(req,res)=>{
    const{id} =req.params

    console.log(req.params)
    const data = await Detailproduct.destroy({where:{id}})
    res.json(data)
    console.log('Success');
})

module.exports = router;

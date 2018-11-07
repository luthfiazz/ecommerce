const express = require('express');
const router = express.Router();
const {User,Product,Detailproduct,Cart} = require ('../db/models')
const passport = require ('../helper/auth')


/* GET users listing. */
router.get('/', async(req, res)=> {
  const {id} = req.user
  const data = await Cart.findAll({
    include:User,
    where:{id_user:id}
  })
  res.json(data)
});

router.get('/:id', async(req,res)=>{
  const id = req.params.id
  const data = await Cart.findOne({
    where:{id_user:id}
  })
  res.json(data)
})

router.post('/:id', async(req,res)=>{
  const{
    shipping,
    deliverycost,
    subtotal
  }=req.body
  const {id}=req.user
  console.log(id);
  const data = await Cart.create({
    shipping,
    deliverycost,
    subtotal
  })
  res.json(data)
})

router.put('/:id', async(req,res)=>{
  const{id}=req.params
  const{
    shipping,
    deliverycost,
    subtotal
  }=req.body
  const data = await Cart.update({
    shipping,
    deliverycost,
    subtotal
  },{
    where:{id_user:id}
  })
  res.json(data)
  console.log('Success')
})

router.delete('/:id', async (req,res)=>{
  const{id} = req.params
  const data = await Cart.destroy({where:{id}})
  res.json(data)
  console.log('Succes');
})

module.exports = router;

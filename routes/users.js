const express = require('express');
const router = express.Router();
const {User} = require('../db/models');
const passport = require('../helper/auth')

/* GET users listing. */
router.get('/', async (req, res)=> {
  const data = await User.findAll()
  res.json(data);
});
// console.log(data)

router.get('/:id', async (req, res)=>{
  const {id} =req.User

  try{
    const data = await user.findOne({
      where:{
        id
      }
    })
    res.json(data)
  }catch(error){
    res.json(error)
  }
})

/* POST users listing. */
router.post('/', async(req,res)=>{
  const{fullname,
        email,
        password,
        no_telepone,
        address,
        access
       }=req.body

  try{
    const data = await User.create({
      fullname,
      email,
      password,
      no_telepone,
      address,
      access
    })
    res.json(data)
  }catch (error){
    res.json(error)
  }
})

/* PUT users listing. */
router.put('/:id', async(req,res)=>{
  const{id} = req.params
  const{fullname,email,password,no_telepone,address,access}=req.body

  const data = await User.update({fullname,email,password,no_telepone,address,access},{
    where:{id:id}
  })
  res.json(data)
  console.log('Update Success')
})

/* DELETE users listing. */
router.delete('/:id', async(req,res)=>{
  const{id}=req.params

  const data = await User.destroy({where:{id:id}})
  res.json(data)
  console.log('Delete Success')
})

module.exports = router;

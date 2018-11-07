const express = require('express')
const router = express.Router()
const {
    User
} = require('../db/models')
const passport = require('../helper/auth')
const jwt = require('jsonwebtoken')



router.post('/', async (req, res) => {
    const {email,
           password
          } = req.body

     
    try {
        const data = await User.findOne({
            where: {
                email:email,
                password:password
            }
        })

        console.log(data)

        const token = jwt.sign({
            id:data.id,
            fullname:data.fullname,
            email: data.email,
            password: data.password,
            no_telepone:data.no_telepone,
            address:data.address,
            access:data.access
        }, 'secret', {

            issuer: 'ecommerce.com',
            audience: 'ecommerce',
        })
        res.json({token})
    } catch (error) {
        res.json(error)
    }
})


module.exports = router;
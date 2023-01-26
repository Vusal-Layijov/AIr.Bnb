const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, sequelize, ReviewImage, Booking } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const { where, Model } = require('sequelize');
const { requireAuth } = require('../../utils/auth.js');
const router = express.Router();

router.get('/current',requireAuth, async(req,res,next)=>{
    let bookings = await Booking.findAll({
        where:{userId:req.user.id},
        include:{
            model:Spot,
            include:{
                model: SpotImage,
                where: {
                   // spotId: spot.id,
                    preview: true,
                },
                attributes: ['url'],
           
            }
        }
})
console.log(bookings)
res.json(bookings)
})




module.exports = router
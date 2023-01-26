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
    let currentBookings = await Booking.findAll({
        where:{userId:req.user.id},
        include:[
            {model:Spot,
            include:{
                model:SpotImage,
                where:{
                    preview:true
                },
                attributes:['url']
            }
            }
        ]
    })
    let Bookings=[]
    for (let review of currentBookings){
        let obg={
            id: review.id,
            spotId: review.spotId,
            Spot:{
                id: review.Spot.id,
                ownerId: review.Spot.ownerId,
                address: review.Spot.address,
                city: review.Spot.city,
                state: review.Spot.state,
                country: review.Spot.country,
                lat: review.Spot.lat,
                lng: review.Spot.lng,
                name: review.Spot.name,
                price: review.Spot.price,
                previewImage: review.Spot.SpotImages[0].url
            },
            userId: review.userId,
            startDate:review.startDate,
            endDate:review.endDate,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
        }
        Bookings.push(obg)
    }



//console.log(bookings)
res.json(
    { Bookings }
    )
})
//router.put('/:bookingId',requireAuth)



module.exports = router
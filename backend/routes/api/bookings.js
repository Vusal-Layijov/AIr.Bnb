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
router.put('/:bookingId', requireAuth, async (req,res,next)=>{
    let booking = await Booking.findByPk(req.params.bookingId)
   // console.log(booking.spotId)
    if (!booking) {
        let err = new Error()
        err.status = 404
        err.message = 'Booking could not be found'
      return  next(err)
    }
    let date1 = new Date(req.body.startDate)
    let date2 = new Date(req.body.endDate)
    let start = date1.getTime()
    let end = date2.getTime()
    if (end - start <= 0) {
        let err = new Error('endDate cannot be on or before startDate')
        err.status = 400
       return next(err)
    }
    let today = new Date()
    let todaySec = today.getTime()
    if(todaySec-start>=0){
        let err = new Error()
        err.status = 404
        err.message = 'Past bookings couldnt be modified'
       return next(err)
    }
    //console.log(booking)
    //let spotBookings = await 
    let Bookings = await Spot.findByPk(booking.spotId,
        {
            include: {
                model: Booking,
                attributes: ['spotId', 'startDate', 'endDate']
            },
            attributes: []
        },

    )

    for (let booking of Bookings.Bookings) {
        let bookingStart = new Date(booking.startDate)
        let bookingStartSec = bookingStart.getTime()
        let bookingEnd = new Date(booking.startDate)
        let bookingEndSec = bookingEnd.getTime()
        console.log(bookingStartSec, bookingEndSec)
        if (start == bookingStartSec || start == bookingEndSec || end == bookingStartSec || end == bookingEndSec) {
            let err = new Error('Sorry, this spot is already booked for the specified date')
            err.status = 403
            err.errors = {
                startDate: 'Start date conflicts with existing booking',
                endDate: 'End date conflicts wih existing booking'
            }
         return   next(err)
        }
    }
    if(req.user.id==booking.userId){
        const{startDate,endDate}= req.body
        let updated = await booking.update({
            startDate,endDate
        })
        res.json(
            updated
        )
    }
    else if (req.user.id !== booking.userId){
        res.json({
            message:'Forbidden'
        })
    }
    
})
router.delete('/:bookingId',requireAuth, async(req,res,next)=>{
    let booking = await Booking.findByPk(req.params.bookingId)
    // console.log(booking.spotId)
    if (!booking) {
        let err = new Error()
        err.status = 404
        err.message = 'Booking could not be found'
        return next(err)
    }
    let date1 = new Date(booking.startDate)
    let start = date1.getTime()
    let today = new Date()
    let todaySec = today.getTime()

    if(start<todaySec){
        let err = new Error ('Bookings that have been started can not be deleted')
        err.status =400
        return next (err)
    }



    console.log(booking.startDate)
    let spot = await Spot.findByPk(booking.spotId)
    let owner = await spot.getUser()
    //console.log(owner.id)
    if(booking.userId==req.user.id || req.user.id==owner.id){
        await booking.destroy()
        return res.json({
            message: "Successfully deleted"
        })
    }
   else if (booking.userId !== req.user.id || req.user.id !== owner.id) {
        return res.json({
            message: "Forbidden"
        })
    }
})



module.exports = router
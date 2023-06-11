require('dotenv').config();
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({storage:storage})
const express = require('express')
const bodyParser = require('body-parser')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User,Spot,Review,SpotImage,sequelize,ReviewImage,Booking} = require('../../db/models');
const {
    multipleMulterUpload,
    multiplePublicFileUpload,
} = require("../../aws");

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const { where } = require('sequelize');
const { requireAuth } = require('../../utils/auth.js');
const e = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

const jsonParser = bodyParser.json()

router.get('/', async(req,res,next)=>{

    let { page, size } = req.query;
    let pagination ={}
    if(page||size){

    if(isNaN(page) && page){
        let err = new Error('Page Must be Number')
        return next(err)
    }
    if (isNaN(size) && size) {
            let err = new Error('Size Must be Number')
            return next(err)
    }
    page = parseInt(page);
    size = parseInt(size);

    if(page<1){
        let err = new Error('Page must be greater or equal to 1')
        return next(err)
    }
    if (size < 1) {
        let err = new Error('Size must be greater or equal to 1')
        return next(err)
    }
        if (!page) page = 1;
        if (!size) size = 20;
        if (page >= 1 && size >= 1) {
            if (size > 20) {
                size=20
                pagination.limit = size
            } 
            if(size<=20) {
                pagination.limit = size
            }
            if(page > 10){
                page=10
                pagination.offset = size * (page - 1)
            }
            else if(page<=10){
                pagination.offset = size * (page - 1)
            }
            
        }

    }
    if (!page && !size) {
             page = 1;
             size = 20;
             pagination.limit = size
             pagination.offset = size * (page - 1)
        } 

        let where = {}
        if(req.query.minLat && !req.query.maxLat){
            if (isNaN(req.query.minLat)){
                let err = new Error('Minimum latitude is invalid')
                return next(err)
            }
            else{
                where.lat = {
                    [Op.gte]: req.query.minLat
                }
                
            }
        }
    if (req.query.maxLat && !req.query.minLat) {
        if (isNaN(req.query.maxLat)) {
            let err = new Error('Maximum latitude is invalid')
            return next(err)
        }
        else {
            where.lat = {
                [Op.lte]: req.query.maxLat
            }
        }
    }
    if (req.query.maxLat && req.query.minLat) {
        if (isNaN(req.query.maxLat)) {
            let err = new Error('Maximum latitude is invalid')
            return next(err)
        }
        if (isNaN(req.query.minLat)) {
            let err = new Error('Minimum latitude is invalid')
            return next(err)
        }


        else {
            where.lat = {
                [Op.between]: [req.query.minLat,req.query.maxLat]
            }
        }
    }





    if (req.query.minLng && !req.query.maxLng) {
        if (isNaN(req.query.minLng)) {
            let err = new Error('Minimum longtitude is invalid')
            return next(err)
        }
        else {
            where.lng = {
                [Op.gte]: req.query.minLng
            }

        }
    }
    if (req.query.maxLng && !req.query.minLng) {
        if (isNaN(req.query.maxLng)) {
            let err = new Error('Maximum longtitude is invalid')
            return next(err)
        }
        else {
            where.lng = {
                [Op.lte]: req.query.maxLng
            }
        }
    }
    if (req.query.maxLng && req.query.minLng) {
        if (isNaN(req.query.maxLng)) {
            let err = new Error('Maximum longtitude is invalid')
            return next(err)
        }
        if (isNaN(req.query.minLng)) {
            let err = new Error('Minimum longtitude is invalid')
            return next(err)
        }
        else {
            where.lng = {
                [Op.between]: [req.query.minLng,req.query.maxLng]
            }
        }
    }

    if(req.query.minPrice && !req.query.maxPrice){
        if (isNaN(req.query.minPrice)) {
            let err = new Error('Minimum price is invalid')
            return next(err)
        }

        if (parseInt(req.query.minPrice) < 0) {
            let err = new Error('Minimum price must be greater or equal to 0')
            return next(err)
        }else{
            where.price = {
                [Op.gte]: req.query.minPrice
            }
        }

    }

    if (req.query.maxPrice && !req.query.minPrice) {
        if (isNaN(req.query.maxPrice)) {
            let err = new Error('Maximum price is invalid')
            return next(err)
        }

        if (parseInt(req.query.maxPrice) < 0) {
            let err = new Error('Maximum price must be greater or equal to 0')
            return next(err)
        } else {
            where.price = {
                [Op.lte]: req.query.maxPrice
            }
        }

    }
    if (req.query.maxPrice && req.query.minPrice) {
        if (isNaN(req.query.maxPrice)) {
            let err = new Error('Maximum price is invalid')
            return next(err)
        }

        if (parseInt(req.query.maxPrice) < 0) {
            let err = new Error('Maximum price must be greater or equal to 0')
            return next(err)
        } 
        if (isNaN(req.query.minPrice)) {
            let err = new Error('Minimum price is invalid')
            return next(err)
        }

        if (parseInt(req.query.minPrice) < 0) {
            let err = new Error('Minimum price must be greater or equal to 0')
            return next(err)
        }
        
        
        
        
        else {
            where.price = {
                [Op.between]: [req.query.minPrice, req.query.maxPrice]
            }
        }

    }


    let spots = await Spot.findAll(
    // {include:Review,
    //                 attributes:[
    //             [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
    //         ]}
       // 
        { 
            where,
            ...pagination 
        }
    )
    // let arr=[]
    // for(let spot of spots){
    //     let forAverage = await Spot.findByPk(spot.id,{
    //         include:{
    //             model:Review,
    //             attributes:[]
    //         },
    //         attributes:[
    //             [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'], 
    //         ]

    //     })
    //     arr.push(forAverage)
    // }
    // console.log(arr)
   // console.log(spots[0].id)
        let result=[]
    for (let spot of spots){
        let data = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes:[
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
            ]
           
        })
        //console.log(spot.toJSON())
        //console.log(data[0].dataValues.avgRating)
        //let spott = await Spot.findByPk(spot.id)
       let resData = spot.toJSON()
      resData.avgRating = data[0].dataValues.avgRating
        let previewImage = await Spot.findByPk(spot.id,{
            include:{
                model:SpotImage,
                where:{
                    spotId:spot.id,
                    preview:true,
                },
                attributes: ['url']
            },
            attributes:[]
        })
        resData.previewImage=previewImage.SpotImages[0].url
        //console.log(previewImage)
        result.push(resData)

    }


  // for query
  const {q} = req.query
  const keys= ['city','state','country']
  const search = (data) => {
    return data.filter((item) =>
    keys.some((key) =>item[key].toLowerCase().includes(q.toLowerCase()))
    )
  }
  if(q){
      res.json({
          Spots: search(result),
          page,
          size
      })
  }else{

      res.json({
          Spots:result,
          page,
          size
      })
  }
    
} )


router.get('/current',requireAuth, async(req,res)=>{
   
   // let userSpots = await User.findByPk(req.user.id
    //     {
    //     include:{
    //         model:Spot,
    //         include:[
    //         {
    //             model: Review,
    //             attributes: [
    //                 [sequelize.fn('AVG', sequelize.col('stars')), 'avgstarrating']
    //             ]
    //         },
    //         {
    //             model:SpotImage,
    //             where:{preview:true},
    //             attributes:['url']
    //         }
    //     ]
    //     },
    //     attributes:[] 
    // }
   // )
    let spots = await Spot.findAll(
        {where:{ownerId:req.user.id}}
    )
    let result = []
    for (let spot of spots) {
        let data = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
            ]

        })
    
 //  let Spots= userSpots.toJSON()
        let resData = spot.toJSON()
        resData.avgRating = data[0].dataValues.avgRating
        let previewImage = await Spot.findByPk(spot.id, {
            include: {
                model: SpotImage,
                where: {
                    spotId: spot.id,
                    preview: true,
                },
                attributes: ['url']
            },
            attributes: []
        })
        resData.previewImage = previewImage.SpotImages[0].url
        //console.log(previewImage)
        result.push(resData)

    }


    //  console.log(data)

    res.json({
        Spots: result
    })
})


router.get('/:spotId', async(req,res,next)=>{
    let spot = await Spot.findByPk(req.params.spotId)
    if(!spot) {
        let err = new Error()
        err.message='Spot could not be found'
        err.status=404
        next(err)
    }
    let numreview = await Review.count(
        {
        where:{
            spotId:spot.id
        }
    }
    )
    let avgstarrating = await Review.findAll( {
        where: {
            spotId: spot.id
        },
        attributes:[
            [sequelize.fn('AVG', sequelize.col('stars')),'avgstarrating']
        ]
    })
    
    //console.log(avgstarrating[0].dataValues.avgstarrating)
    let sendData = spot.toJSON()
    sendData.avgstarrating = avgstarrating[0].dataValues.avgstarrating
    sendData.numReviews=numreview
    let spotOwner = await spot.getUser()
    let SpotImages = await SpotImage.findAll({
        where:{spotId:spot.id},
        attributes:['id','url','preview']
    })
    let Owner = {
        id:spotOwner.id,
        firstName:spotOwner.firstName,
        lastName:spotOwner.lastName
    }
    console.log(Owner.id)
    
    //console.log(numreview)
    res.json({...sendData, Owner,SpotImages})
})

router.post('/', requireAuth, async(req,res,next)=>{
    const { address,city,state,country,lat,lng,name,description,price} = req.body
        
    
    let spot = await Spot.create({
        address,
        ownerId:req.user.id,
        city, state, country, lat, lng, name, description, price
    })
    res.statusCode=201
    res.json(spot)
})

router.post('/:spotId/images',requireAuth, async(req,res,next)=>{
    
    let spot = await Spot.findByPk(req.params.spotId)
    
    if (!spot) {
        let err = new Error()
        err.status = 404
        err.message = 'Spot could not be found'
        next(err)
    }
    if (spot.ownerId !== req.user.id) {
        let err = new Error()
        err.status = 403
        err.message = 'Forbidden'
        next(err)
    }
    // console.log(req.user.id)
    else if(spot.ownerId===req.user.id){
         const{url,preview}=req.body
        // let newImage = await SpotImage.create({
        //     spotId:req.params.spotId,
        //     url,
        //     preview
        // })
        // let data = newImage
        // return res.json({
        //     id:data.id,
        //     url:data.url,
        //     preview:data.preview
        // }
        // )
        if(!url) res.json({message:"Please provide url", statusCode:404})
        if(preview==true){
            let currPreview = await SpotImage.findOne({where:{
                'spotId':req.params.spotId,
                preview:true
            }})
            if(currPreview) await currPreview.update({'preview':false})
        }
        let newImage = await SpotImage.create({
            spotId:req.params.spotId,
            url:url,
            preview:preview
        })
        res.statusCode=201
        res.json({
            id:newImage.id,
            url:newImage.url,
            preview:newImage.preview
        })
    }
    
})

// changes for AWSAWSAWSAWSAWS
// new images rouste for posting

// router.post('/:spotId/images', requireAuth, multipleMulterUpload('images'), async(req,res,next)=>{
//     let spot = Spot.findByPk(req.params.spotId)
//     const images =await multiplePublicFileUpload(req.files)
//     console.log('--------->',req.files)
    
//     if(!spot){
//         let err= new Error()
//         err.status = 404
//         err.message = 'Spot could not be found'
//     }
//     if (spot.ownerId !== req.user.id){
//         let err = new Error()
//         err.status = 403
//         err.message= 'Forbidden'
//         next(err)
//     }
//     else if (spot.ownerId===req.user.id){
//         for (let i=0; i<images.length; i++){
//             console.log('give me someeeee',images)
//             const newImage ={
//                 url:images[i],
//                 preview: i ===0 ? true : false,
//                 spotId: req.params.spotId
//             }
//             await SpotImage.create(newImage)
//         }
//     }
//     res.sendStatus(200)
// })




router.put('/:spotId', requireAuth,async(req,res,next)=>{
    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        let err = new Error()
        err.status = 404
        err.message = 'Spot could not be found'
        next(err)
    }
    if (spot.ownerId !== req.user.id){
        let err = new Error()
        err.status = 403
        err.message = 'Forbidden'
        next(err)
    }
    else if (spot.ownerId === req.user.id){
        const { address, city, state, country, lat, lng, name, description, price } = req.body


        let updatedSpot = await spot.update({
            address,
            city, state, country, lat, lng, name, description, price
        })
        return res.json(updatedSpot)
    }
})
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        let err = new Error()
        err.status = 404
        err.message = 'Spot could not be found'
        next(err)
    }
    if (spot.ownerId !== req.user.id) {
        let err = new Error()
        err.status = 403
        err.message = 'Forbidden'
        next(err)
    }
    else if (spot.ownerId === req.user.id) {
       await spot.destroy()
        return res.json({
           message: "Successfully deleted"
        })
    }
})
router.post('/:spotId/reviews',requireAuth, async(req,res,next)=>{
    let reviews = await Review.findAll({
        where:{
            spotId:req.params.spotId,
            userId:req.user.id
        }
    })
    if(reviews.length){
        let err = new Error('User already has a review for this spot')
        err.status=403
       return next(err)
    }
   // console.log(reviews)
    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        let err = new Error()
        err.status = 404
        err.message = 'Spot could not be found'
      return  next(err)
    }
 
    const { review, stars } = req.body
    let newReview = await Review.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        review,
        stars
    })
    let data = await Review.findOne({
        where:{
            spotId:req.params.spotId,
            userId:req.user.id
        },
        attributes: ['id', 'userId', "spotId", "review", "stars", "createdAt", "updatedAt"]
    })
    console.log(data.id)
    return res.json({
        id: data.id,
        userId:data.userId,
        spotId:data.spotId,
        review:data.review,
        stars:data.stars,
        createdAt:data.createdAt,
        updatedAt:data.updatedAt
        
    }
    )


})
router.get('/:spotId/reviews',async(req,res,next)=>{
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        let err = new Error()
        err.status = 404
        err.message = 'Spot could not be found'
       return next(err)
    }

    let reviews = await Spot.findByPk(req.params.spotId,{
        include:[
            {
                model:Review,
                include:[
                    { model: User ,
                    attributes:['id','firstName','lastName']
                    },
                    {model:ReviewImage,
                        attributes: ['id', 'url']
                    }
                ] 
            },
            
        ],
        attributes:[]
    })

    res.json(reviews)
})

router.get('/:spotId/bookings',requireAuth, async(req,res,next)=>{


    let spot= await Spot.findByPk(req.params.spotId)
    if (!spot) {
        let err = new Error()
        err.status = 404
        err.message = 'Spot could not be found'
        next(err)
    }
    let Owner = await spot.getUser()
    console.log(Owner.id,req.user.id)
    if(Owner.id !== req.user.id){
        let Bookings = await Spot.findByPk(req.params.spotId,
          {
            include:{model:Booking,
                attributes:['spotId','startDate','endDate']
            },
            attributes: [] 
          },
           
        )
        res.json(
            Bookings
        )
    }
    else if (Owner.id == req.user.id){
        let Bookings = await Spot.findByPk(req.params.spotId,{
            include:{
                model:Booking,
                include:{
                    model:User,
                    attributes:['id','firstName','lastName']
                }
            },
            attributes:[]
        }

        )
        res.json(
            Bookings
        )
    }
   
})
router.post('/:spotId/bookings',requireAuth, async(req,res,next)=>{
    let spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        let err = new Error("Spot could not be found")
        err.status = 404
        err.errors = ['Spot could not be found']
        next(err)
    }
    let date1 = new Date(req.body.startDate)
    let date2 = new Date (req.body.endDate)
    let date3 = new Date().getTime()

    let start = date1.getTime()
    let end = date2.getTime()
    if(end-start<=0){
        let err = new Error('EndDate cannot be on or before startDate')
        err.status=400
        err.errors = ['EndDate cannot be on or before startDate']
        return    next(err)
    }
    if (date3 - start >= 0) {
        let err = new Error('Please choose different start date')
        err.status = 400
        err.errors = ['Please choose different start date']
        return    next(err)
    }
    let Bookings = await Spot.findByPk(req.params.spotId,
        {
            include: {
                model: Booking,
                attributes: ['spotId', 'startDate', 'endDate']
            },
            attributes: []
        },

    )
    for (let booking of Bookings.Bookings){
        let bookingStart = new Date(booking.startDate)
        let bookingStartSec = bookingStart.getTime()
        let bookingEnd = new Date(booking.startDate)
        let bookingEndSec = bookingEnd.getTime()
        console.log(bookingStartSec, bookingEndSec)
        if(start==bookingStartSec||start==bookingEndSec||end==bookingStartSec||end==bookingEndSec){
            let err = new Error ('Sorry, this spot is already booked for the specified date')
            err.status =403
            err.errors = ['Sorry, this spot is already booked']
                
            next(err)
        }
    }




   // console.log(Bookings)
    let Owner = await spot.getUser()
    if (Owner.id !== req.user.id){
        const {startDate,endDate} = req.body
       
        let booked = await Booking.create({
            spotId : req.params.spotId,
            userId:req.user.id,
            startDate,
            endDate
        })
       
        return res.json(booked)
    }
    else if (Owner.id == req.user.id){
        let err = new Error("You own spot alreadty! ")
        err.status = 404
        err.errors = ['You own spot already!']
        next(err)
    }
})

module.exports = router;
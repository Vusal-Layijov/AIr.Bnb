const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, sequelize,ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const { where, Model } = require('sequelize');
const { requireAuth } = require('../../utils/auth.js');
const router = express.Router();

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
router.post('/:reviewId/images',requireAuth, async(req,res,next)=>{
    let id = parseInt(req.params.reviewId)
    let review = await Review.findOne({
        where:{
          id:id
        }
    }
        )
    if(!review){
        let err = new Error('Review could not be found')
        err.status=404,
        next(err)
    }
    let owner = review.userId
    let reviewCount = await ReviewImage.count({
        where:{reviewId:id}
    }
    
    )
   // console.log(owner)
    if(reviewCount>10){
        let err = new Error('Maximum number of images for this resource was reached')
        err.status=403
        next(err)
    }
    const{ url} = req.body
    if(owner===req.user.id){
    let newRevImg = await ReviewImage.create({
        reviewId:req.params.reviewId,
        url
    })
    res.json({
        id:newRevImg.id,
        url:newRevImg.url
    } )
    }
    else{
        let err = new Error('Forbidden')
        next(err)
    }
})
router.get('/current',requireAuth, async(req,res,next)=>{
    //let id = parseInt(req.user.id)
    let currentReviews = await Review.findAll({
        where:{userId:req.user.id},
       // attributes: ['id', 'userId', "spotId", "review", "stars", "createdAt", "updatedAt"],
    
         include:[
                    
         { model: User, 
           attributes:['id','firstName','lastName']
         } ,
                    
         { model: Spot,
             include: {
                 model: SpotImage,
                 where: {
                     preview: true,
                 },
                 attributes: ['url']
             } 
         } , 
                    
         { model: ReviewImage ,
             attributes: ['id', 'url']
        }  
            
        ]
        
    })

    let Reviews = []
    for(let review of currentReviews){
        let obj ={
            id:review.id,
            userId:review.userId,
            spotId:review.spotId,
            review:review.review,
            stars:review.stars,
            createdAt:review.createdAt,
            updatedAt:review.updatedAt,
            User:review.User,
            Spot:{
                id: review.Spot.id,
                ownerId:review.Spot.ownerId,
                address:review.Spot.address,
                city:review.Spot.city,
                state:review.Spot.state,
                country:review.Spot.country,
                lat:review.Spot.lat,
                lng:review.Spot.lng,
                name:review.Spot.name,
                price:review.Spot.price,
                previewImage:review.Spot.SpotImages[0].url
            },
            ReviewImages:review.ReviewImages 
        }
        Reviews.push(obj)
    }
    
    res.json({
        //currentReviews
        Reviews
    } )
})

router.put('/:reviewId', requireAuth, async(req,res,next)=>{
    let id = parseInt(req.params.reviewId)
    let revieW = await Review.findOne({
        where: {
            id: id
        }
    }
    )
    if (!revieW) {
        let err = new Error('Review could not be found')
        err.status = 404,
            next(err)
    }
    let owner = revieW.userId
    const{review,stars}=req.body
    if (owner === req.user.id) {
        let updatedReview = await revieW.update({
            spotId:revieW.spotId,
            userId:req.user.id,
            review,
            stars:stars
        })
        // let result = await Review.findOne({
        //     where: {
        //         id: id
        //     },
        //  //   attributes: ['id', 'userId', "spotId", "review", "stars", "createdAt", "updatedAt"],
            
        // }
        // )
        return res.json(updatedReview)
    }
    else {
        let err = new Error('Forbidden')
        next(err)
    }
})
router.delete('/:reviewId', requireAuth, async(req,res,next)=>{
    
    let id = parseInt(req.params.reviewId)
    let revieW = await Review.findOne({
        where: {
            id: id
        }
    }
    )
    if (!revieW) {
        let err = new Error('Review could not be found')
        err.status = 404,
            next(err)
    }
    let owner = revieW.userId
    if (owner === req.user.id){
        await revieW.destroy()
        return res.json({
            message: "Successfully deleted"
        })
    }
    else {
        let err = new Error('Forbidden')
        next(err)
    }
})


module.exports = router;
const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, sequelize,ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const { where } = require('sequelize');
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
    let review = await Review.findByPk(req.params.reviewId)
    if(!review){
        let err = new Error('Review could not be found')
        err.status=404,
        next(err)
    }
    let reviewCount = await ReviewImage.count({
        where:{reviewId:req.params.reviewId}
    }
    
    )
    console.log(reviewCount)
    if(reviewCount>10){
        let err = new Error('Maximum number of images for this resource was reached')
        err.status=403
        next(err)
    }
    const{ url} = req.body
    let newRevImg = await ReviewImage.create({
        reviewId:req.params.reviewId,
        url
    })
    res.json({
        id:newRevImg.id,
        url:newRevImg.url
    } )
})





module.exports = router;
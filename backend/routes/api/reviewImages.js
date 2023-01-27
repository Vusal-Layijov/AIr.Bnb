const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, sequelize, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const { where, Model } = require('sequelize');
const { requireAuth } = require('../../utils/auth.js');
const router = express.Router();

router.delete('/:imageId', requireAuth, async(req,res,next)=>{
    let image = await ReviewImage.findByPk(req.params.imageId)
    if (!image) {
        let err = new Error('Review image could not be found')
        err.status = 404
        return next(err)
    }
    let review = await image.getReview()
    let owner = await review.getUser()

    console.log(owner.id)
    if (req.user.id == owner.id) {
        await image.destroy()
        res.json({
            message: "Successfully deleted"
        })
    } else {
        res.json({
            message: 'Forbidden'
        })
    }
})


module.exports = router
const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Spot, Review, SpotImage, sequelize, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const { where, Model } = require('sequelize');
const { requireAuth } = require('../../utils/auth.js');
const router = express.Router();

const authorize= async(req,res,next) => {
    let spotImg = await SpotImage.findByPk(req.params.imageId, {attributes:['spotId']})
    spotImg=spotImg.toJSON()
    let spot = await Spot.findByPk(spotImg.spotId)
    spot = spot.toJSON()
    if(spot.ownerID==req.user.id) return next()
    return res.json({
        message:'Forbidden',
        statusCode:403
    })
}

router.delete('/:imageId',requireAuth, async(req,res,next) =>{
    let image = await SpotImage.findByPk(req.params.imageId)
    if(!image){
        let err = new Error('Spot image could not be found')
        err.status=404
        return next(err)
    }
    let spot = await image.getSpot()
    let owner = await spot.getUser()

    console.log(owner.id)
    if(req.user.id==owner.id){
    await image.destroy()
    res.json({
        message:"Successfully deleted"
    })
    }else{
        res.json({
            message:'Forbidden'
        })
    }
})

module.exports=router
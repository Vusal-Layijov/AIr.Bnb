const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User,Spot,Review,SpotImage,sequelize } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');

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

router.get('/', async(req,res)=>{
    let spots = await Spot.findAll(
    // {include:Review,
    //                 attributes:[
    //             [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
    //         ]}
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


  //  console.log(data)

    res.json({
        Spots:result
    })
} )


router.get('/current', async(req,res)=>{
    console.log(req.user.id)
    let userSpot = await User.findByPk(req.user.id,{
        include:{
            model:Spot
        },
        attributes:[]
    })
   let Spots= userSpot.Spots
    res.json({
        Spots
    })
})

router.get('/:spotId', async(req,res)=>{
    let spot = await Spot.findByPk(req.params.spotId)
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
    let Owner = await spot.getUser()
    let SpotImages = await SpotImage.findAll({
        where:{spotId:spot.id},
        attributes:['id','url','preview']
    })
    
    console.log(numreview)
    res.json({...sendData, Owner,SpotImages})
})
module.exports = router;
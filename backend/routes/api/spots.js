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
        let data = await Spot.findByPk(spot.id, {
                        include:{
                model:Review,
                attributes:[]
            },
            attributes:[
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating'],
            ]
        })
        let spott = await Spot.findByPk(spot.id)
        let resData = spott.toJSON()
        resData.avgRating = data.dataValues.avgRating
        // let previewImage = await Spot.findByPk(spot.id,{
        //     include:{
        //         model:SpotImage,
        //         where:{
        //             spotId:spot.id,
        //             preview:true,
        //         },
        //         attributes: ['url']
        //     },
        //     attributes:[]
        // })
        // resData.previewImage=previewImage.SpotImages[0].url
        // console.log(previewImage)
        result.push(resData)

    }


    //console.log(result)

    res.json({
        Spots:result
    })
} )





module.exports = router;
import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reviewMakerFunc } from '../../store/review'
export default function SpotReviews({reviews, spotId}) {
    const dispatch = useDispatch()
   console.log('review from spotrewies', reviews)
   let mapreviews = Object.values(reviews)
   let filtered = mapreviews.filter(son => son.spotId == spotId)
   // console.log('setting new review', review)
    // useEffect(() =>{
    //     dispatch(reviewMakerFunc(spotId))
    // }, [dispatch])
    // if(!reviews) {
    //     return null
    // }
  return (
    <div>
      {filtered.map((review) =>(
        <>
        <h2>{review.User.firstName}</h2>
        <h3>{review.createdAt}</h3>
        <p>{review.review}</p>
        </>
      ))

      }
    </div>
  )
}

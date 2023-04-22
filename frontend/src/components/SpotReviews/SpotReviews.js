import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reviewMakerFunc } from '../../store/review'
import DeleteReview from '../DeleteReview/DeleteReview'
import OpenModalButton from '../OpenModalButton'
import './SpotReviews.css'
import UpdateReview from '../UpdateReview'
export default function SpotReviews({review, user, spotId}) {
    const dispatch = useDispatch()
  //  console.log('review from spotrewies', reviews)
  //  let mapreviews = Object.values(reviews)
  //  let filtered = mapreviews.filter(son => son.spotId == spotId)
   // console.log('setting new review', review)
    // useEffect(() =>{
    //     dispatch(reviewMakerFunc(spotId))
    // }, [dispatch])
    // if(!reviews) {
    //     return null
    // }
  //{
  //   filtered.map((review) => (
  //     <>
  //       <h2>{review.User.firstName}</h2>
  //       <h3>{review.createdAt}</h3>
  //       <p>{review.review}</p>
  //     </>
  //   ))

  // }
  let gun = review.createdAt
  let gunParsed = Date.parse(gun)
  let obj = new Date (gunParsed)
  console.log(obj)
  let newdate = obj.toString()
  let vaxtarr = newdate.split(' ')
  let month = vaxtarr[1]
  let sonGun = vaxtarr[2]
  let il = vaxtarr[3]
  let toCheck = user.id == review.userId
  if(!review) return null
  return (
    <div style={{marginTop:'10px'}}>
      <h3>{review.User.firstName}</h3>
      <h4>{`${il}-${month}-${sonGun}`}</h4>
      <p>{review.review}</p>
      <div style={{ marginTop: '10px' }}>
        {toCheck ? (
        <div className='deleteupdate'>
          <div >
              <OpenModalButton
                buttonText="Update"
                modalComponent={<UpdateReview oldReview={review} spotId={spotId} />}
              />
          </div>
          <div>
              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteReview spotId={spotId} review={review} />}
              />
          </div>
        </div>
        ) : null

        }
      </div>
    </div>
  )
}

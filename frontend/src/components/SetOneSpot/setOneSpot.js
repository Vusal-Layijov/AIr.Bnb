import React, {useEffect} from 'react';
import { useParams,} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAllSpots } from '../../store/spots';
import SpotReviews from '../SpotReviews/SpotReviews';
import { Route } from 'react-router-dom';
import { reviewMakerFunc } from '../../store/review';
import './SetOneSpot.css'
import { setOneSpotDetails } from '../../store/singlespot';
function SetOneSPot () {
  const { spotId } = useParams()
    const spot = useSelector(state =>state.spots[spotId]);
  const reviews = useSelector(state =>  state.reviews)
  const singleSpot =useSelector (state => state.singleSpot)
   console.log('gediremmi datatatatat',singleSpot)
    const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(setOneSpotDetails(spotId))
  },[dispatch])  
  useEffect(() => {
    dispatch(setAllSpots())
  }, [])

  useEffect(() => {
    dispatch(reviewMakerFunc(spotId))
  }, [dispatch])

  if (!spot) {
    return null
  }
    return (
      <div>
       <h1>{spot.name}</h1>
       <h2>{spot.city}, {spot.state}, {spot.country}</h2>
        <img src={spot.previewImage} style={{width:'800px'}} ></img>
        <div>Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName} </div>
        <div className='underHost'>
          <div>{spot.description}</div>
          <div className='upperReserveButton'>
            <div className='underHost'>
              <div>{spot.price}</div>
              <div>{singleSpot.avgstarrating}⭐️ . {singleSpot.numReviews} reviews</div>
            </div>
            <div>
              <button onClick={() =>alert('This future is coming')}>Reserve</button>
            </div>
          </div>
        </div>
        <br></br>
        <div>{singleSpot.avgstarrating}⭐️ . {singleSpot.numReviews} reviews</div>
       <SpotReviews reviews={reviews} spotId={spotId} />
      </div>
    );
}

export default SetOneSPot;
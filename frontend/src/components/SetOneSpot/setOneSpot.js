import React, {useEffect} from 'react';
import { useParams,} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAllSpots } from '../../store/spots';
import SpotReviews from '../SpotReviews/SpotReviews';
import { Route } from 'react-router-dom';
import { reviewMakerFunc } from '../../store/review';
import './SetOneSpot.css'
import { setOneSpotDetails } from '../../store/spots';
function SetOneSPot () {
  const { spotId } = useParams()
   // const spot = useSelector(state =>state.spots.allSpots[spotId]);
   // console.log('spotttttt', spot)
  const reviews = useSelector(state =>  state.reviews)
  const singleSpot =useSelector (state => state.spots.singleSpot)
   console.log('gediremmi datatatatat',singleSpot)
    const dispatch = useDispatch()
 
  // useEffect(() => {
  //   dispatch(setAllSpots())
  // }, [])
  useEffect(() => {
    dispatch(setOneSpotDetails(Number(spotId)))
    dispatch(reviewMakerFunc(spotId))
  },[spotId] )  
  // useEffect(() => {
    
  // }, [])

  // if (!spot) {
  //   return null
  // // }
  // if (spot === undefined){
  //   return null
  // }
  if(!singleSpot.Owner){
    return null
  }
    return (
      <div>
       <h1>{singleSpot.name}</h1>
       <h2>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h2>
        <img src={singleSpot.SpotImages[0].url} style={{width:'800px'}} ></img>
        <div>Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName} </div>
        <div className='underHost'>
          <div>{singleSpot.description}</div>
          <div className='upperReserveButton'>
            <div className='underHost'>
              <div>{singleSpot.price}</div>
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
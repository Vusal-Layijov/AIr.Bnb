import React, {useEffect} from 'react';
import { NavLink, useParams,} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAllSpots } from '../../store/spots';
import SpotReviews from '../SpotReviews/SpotReviews';
import { Route } from 'react-router-dom';
import { reviewMakerFunc } from '../../store/review';
import './SetOneSpot.css'
import { setOneSpotDetails } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import ReviewModal from '../ReviewModal';
import Map from '../Map';
import SpotsMap from '../Map';
import ImageGallery from './ImageGallery';
function SetOneSPot () {
  const { spotId } = useParams()
  let user = useSelector(state =>state.session.user);

  const spotReviews = useSelector(state =>  state.reviews.spot)
  const singleSpot =useSelector (state => state.spots.singleSpot)
  const spots = useSelector(state => Object.values(state.spots.allSpots))

    const dispatch = useDispatch()
 
  // useEffect(() => {
  //   dispatch(setAllSpots())
  // }, [])
  useEffect(() => {
    dispatch(setOneSpotDetails(Number(spotId)))
    dispatch(reviewMakerFunc(spotId))
    dispatch(setAllSpots())
  },[dispatch] )  
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
  if (spotReviews.id === null) {
    return null;
  }
  let spotReviewsArr = Object.values(spotReviews);
  if (!user) {
    user = { id: 0 }
  }
  let noReviewYet = true
  if (spotReviewsArr.length > 0) {
    spotReviewsArr.forEach(review => {
      if (review.User?.id === user?.id) noReviewYet = false;
    });
  }
 // <div>{singleSpot.avgstarrating}⭐️ . {singleSpot.numReviews} reviews</div>
  let toCheck = singleSpot.Owner.id == user.id

    return (
    <>  
 
      <div className='mainDiv'>
       <h1>{singleSpot.name}</h1>
       <h2>{singleSpot.city}, {singleSpot.state}, {singleSpot.country}</h2>
          <div className='mapImage' >
          <img src={singleSpot.SpotImages[0].url} style={{ width: '650px', height: '550px', marginLeft :'2px'}} ></img>
          <SpotsMap spots={spots} />
          </div>
        <div>Hosted by {singleSpot.Owner.firstName} {singleSpot.Owner.lastName} </div>
        <div className='underHost'>
          <div>{singleSpot.description}</div>
          <div className='upperReserveButton'>
            <div className='underHost'>
              
                <div>
                {`＄${singleSpot.price}  night`}
                </div>
                <div>   {!singleSpot.numReviews
                  ? "★  New"
                  : `★ ${parseFloat(singleSpot.avgstarrating).toFixed(1)} •`} {" "}
                  {singleSpot.numReviews == 0 ? '' :
                   `${singleSpot.numReviews}  Review`}
                  {singleSpot.numReviews > 1 ? "s" : null}
                </div>
            </div>
            <div className='forReserve'>
                <NavLink to={`/spots/${spotId}/bookings/new`} > <button className='forButton' >Reserve</button></NavLink>
            </div>
          </div>
        </div>
        <br></br>
          <div className='forBreak' >
            <h2 >
              <span>
                ★ 
                {!singleSpot.numReviews
                  ? " New"
                  : `${parseFloat(singleSpot.avgstarrating).toFixed(1) } rating • `}
                {singleSpot.numReviews == 0 ? '' :
                  `${singleSpot.numReviews}  Review`}
                {singleSpot.numReviews > 1 ? "s" : ''}
              </span>
            </h2>


            <div style={{margin:'2px'}}>
              {toCheck === false && user.id !== 0 && noReviewYet ? (
                <OpenModalButton
                  buttonText="Post Your Review"
                  modalComponent={<ReviewModal spotId={spotId} />}
                />
              ) : null}
            </div>
           
            <div style={{ marginBottom: '20px' }}>
              {spotReviewsArr &&
                spotReviewsArr.map((review) => <SpotReviews review={review} user={user} spotId={spotId} />)}
            </div>
            <div style={{marginBottom:'20px'}}>
              {toCheck === false && user.id !== 0 && noReviewYet && spotReviewsArr.length === 0 ? (
                <h2>Be the first to post a review!</h2>
              ) : null}
            </div>
          </div>
      </div>
      </>  
    );
}

export default SetOneSPot;

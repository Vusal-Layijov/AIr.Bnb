import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function SetOneSPot () {
  const { spotId } = useParams()
    const spot = useSelector(state => state.spots.Spots[Number(spotId)-1]);
    console.log(spot)
    const dispatch = useDispatch()
    
    return (
       <h1>{spot.city}</h1>
    );
}

export default SetOneSPot;
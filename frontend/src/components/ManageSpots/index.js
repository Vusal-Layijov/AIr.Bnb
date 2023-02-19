import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Route, useParams } from 'react-router-dom';
import { setCurrentUserSpotsFunc } from '../../store/spots';
import './index.css'
import { removeSpotFunc } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import DeleteSpot from './DeleteSpot';

export default function ManageSpots() {
    const dispatch = useDispatch()
    const spots = useSelector(state => Object.values(state.spots.allSpots))
    useEffect(() =>{
        dispatch(setCurrentUserSpotsFunc())
    },[dispatch])
    if (!spots) {
        return null
    }
   // <button onClick={() => dispatch(removeSpotFunc(spot.id))} >Delete</button>
   // console.log('current user spots', spots)
  return (
    <div className='basGot'>
      <h1>Manage Your Spots</h1>
          <NavLink to={'/spots/new'} > <button className='navlinkBut' >Create a New Spot</button></NavLink> 
      <div className='forfirst'>
          {spots.map((spot) => {
              return (
                  <nav key={spot.id} className='forNewDiv'>
                      <div className='forNav' >
                          <div >
                              <div className='spotClass' >
                                  <img src={spot.previewImage} className='forImage'></img>
                              </div>
                              <div className='forInside'>
                                  <div>{spot.city}, {spot.state}</div>
                                  <div>{spot.avgRating ? `⭐️ ${parseFloat(spot.avgRating).toFixed(1)}` : '⭐️ New'}</div>
                              </div>
                              <div className='forInside'>
                                  <div>${spot.price} night</div>
                                  <NavLink to={`/spots/${spot.id}/edit`}><button >Update</button></NavLink> 
                                  <div><OpenModalButton buttonText="Delete" modalComponent={<DeleteSpot spotId={spot.id} />}/></div>
                              </div>
                          </div>
                      </div>
                  </nav>
              )
          })}
      </div> 
    </div>   
  )
}

import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Route, useParams } from 'react-router-dom';
import { setCurrentUserSpotsFunc } from '../../store/spots';
import './index.css'
import { removeSpotFunc } from '../../store/spots';
export default function ManageSpots() {
    const dispatch = useDispatch()
    const spots = useSelector(state => Object.values(state.spots.allSpots))
    useEffect(() =>{
        dispatch(setCurrentUserSpotsFunc())
    },[dispatch])
    if (!spots) {
        return null
    }
    console.log('current user spots', spots)
  return (
    <>
      <h1>Manage Spots</h1>
      <NavLink to={'/spots/new'} > <button >Create a new Spot</button></NavLink> 
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
                                  <div>⭐️{spot.avgRating}</div>
                              </div>
                              <div className='forInside'>
                                  <div>{spot.price}</div>
                                  <NavLink to={`/spots/${spot.id}/edit`}><button>Update</button></NavLink> 
                                  <button onClick={() => dispatch(removeSpotFunc(spot.id))} >Delete</button>
                              </div>
                          </div>
                      </div>
                  </nav>
              )
          })}
      </div> 
    </>   
  )
}

import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Route, useParams } from 'react-router-dom';
import { setAllSpots } from '../../store/spots';
import './index.css'

export default function AllSpotsDetails() {
    const dispatch = useDispatch()
    const spots = useSelector(state =>Object.values(state.spots.allSpots))
 
    useEffect(() =>{
        dispatch(setAllSpots())
    },[dispatch])
    if(!spots) {
        return null
    }
  return (
   
    
    <div className ='forFirst'>
       {spots.map((spot) =>{
         return (
           <nav key={spot.id} className='forNew'>
             <NavLink style={{ textDecoration: 'none' }} className='fornav'  to={`/spots/${spot.id}`}>
                <div >
                    <div className='spotclass' >
                        <img src={spot.previewImage} className='forimage'></img>
                    </div>
                    <div className='forinside'>
                        <div>{spot.city}, {spot.state}</div>
                   <div>{spot.avgRating ? `⭐️ ${parseFloat(spot.avgRating).toFixed(1)}` : '⭐️ New'}</div>
                    </div>
                    <div>
                   <p>${spot.price} Night</p> 
                    </div>
                </div>
              </NavLink>
            </nav>
          )
        })}
    </div>       
      
    
    
    
  )
}

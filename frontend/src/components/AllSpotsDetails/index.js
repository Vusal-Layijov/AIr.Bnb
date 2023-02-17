import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Route, useParams } from 'react-router-dom';
import { setAllSpots } from '../../store/spots';
import './index.css'

export default function AllSpotsDetails() {
    const dispatch = useDispatch()
    const spots = useSelector(state =>Object.values(state.spots.allSpots))
    //console.log(spots[0].previewImage)
    useEffect(() =>{
        dispatch(setAllSpots())
    },[dispatch])
    if(!spots) {
        return null
    }
    //style={{backgroundImage: `url('${spots[0].previewImage}')`}}
  return (
   
    
    <div className ='forfirst'>
       {spots.map((spot) =>{
         return (
           <nav key={spot.id} className='forNewDiv'>
              <NavLink className='forNav'  to={`/spots/${spot.id}`}>
                <div >
                    <div className='spotClass' >
                        <img src={spot.previewImage} className='forImage'></img>
                    </div>
                    <div className='forInside'>
                        <div>{spot.city}, {spot.state}</div>
                   <div>{spot.avgRating ? `⭐️ ${parseFloat(spot.avgRating).toFixed(1) }`  : 'New'}</div>
                    </div>
                    <div>
                        {spot.price}
                    </div>
                </div>
              </NavLink>
            </nav>
          )
        })}
    </div>       
      
    
    
    
  )
}

import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Route, useParams } from 'react-router-dom';
import { setCurrentUserSpotsFunc } from '../../store/spots';
import './index.css'
import { removeSpotFunc } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import DeleteSpot from './DeleteSpot';
import { get_booking_thunk } from '../../store/bookings';
import DeleteBooking from '../DeleteBooking';

export default function ManageSpots() {
    
    const dispatch = useDispatch()
    const spots = useSelector(state => Object.values(state.spots.allSpots))

    const bookings = useSelector(state => Object.values(state.bookings.user))

    useEffect(() =>{
        dispatch(setCurrentUserSpotsFunc())
        dispatch(get_booking_thunk())
    },[dispatch])
    if (!spots || !bookings) {
        return null
    }

  return (
    <>
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
                                  <NavLink to={`/spots/${spot.id}/edit`}><button className='forButStyle' >Update</button></NavLink> 
                                  <div ><OpenModalButton buttonText="Delete" modalComponent={<DeleteSpot spotId={spot.id} />}/></div>
                              </div>
                          </div>
                      </div>
                  </nav>
              )
          })}
      </div> 
    </div>
    <div className='basGot' >
              <h1>Manage Your Bookings</h1>
              <NavLink to={'/'} > <button className='navlinkBut' >Create a New Booking</button></NavLink>
              <div className='forfirst' > 
              {bookings.map((booking) => {
                  return (
                      <div className='forNewDiv' key={booking.id} >
                            <div className='nameDelete' >
                                 <p style={{ fontWeight: 'bold' }} >At: {booking.Spot.name}</p>
                                 <div><OpenModalButton className={'default-button curs rd-bg'} buttonText={<i class="fas fa-trash-alt"></i>} modalComponent={<DeleteBooking bookingId={booking.id} />} /></div>

                            </div>
                          <p>Date: {new Date(booking.startDate).toISOString().slice(0, 10)} - {new Date(booking.endDate).toISOString().slice(0, 10)}</p>
                          {/* <p className="forDesc" >Special notes: {booking.notes}</p> */}
                          <div className='spotClass' >
                              <img src={booking.Spot.previewImage} className='forImage'></img>
                          </div>
                         
                      </div>

                  )
              })

              }
              </div>
    </div>
    </>   
  )
}

import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { delete_booking_thunk } from "../../store/bookings";
import './index.css'
export default function DeleteBooking({bookingId}){
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const onDelete = () => {
        return dispatch(delete_booking_thunk(bookingId))
        .then(closeModal)
    }
    return (
        <div className='sonMod'>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this booking?</p>
            <button style={{ width: '300px' }} className="Red" type="submit" onClick={onDelete} >Yes(Delete Booking)</button>
            <button style={{ width: '300px' }} className="Blk" type="submit" onClick={closeModal}>No(Keep Booking)</button>
        </div>
    )
}
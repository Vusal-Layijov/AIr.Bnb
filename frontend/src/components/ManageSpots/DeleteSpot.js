import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";
import { removeSpotFunc } from '../../store/spots';
import './index.css'
export default function DeleteSpot({spotId}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const onDelete = () =>{
        return dispatch(removeSpotFunc(spotId))
        .then(closeModal)
    }
  return (
    <div className='sonMod'>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from the listings?</p>
      <button style={{width:'300px'}} className="Red" type="submit" onClick={onDelete} >Yes(Delete Spot)</button>
      <button style={{ width: '300px' }} className="Blk" type="submit" onClick={closeModal}>No(Keep Spot)</button>
    </div>
  )
}

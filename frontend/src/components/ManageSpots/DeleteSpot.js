import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";
import { removeSpotFunc } from '../../store/spots';
export default function DeleteSpot({spotId}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const onDelete = () =>{
        return dispatch(removeSpotFunc(spotId))
        .then(closeModal)
    }
  return (
    <div>
      <h1>Confirm Delete</h1>
      <button onClick={onDelete} >Yes(Delete Spot)</button>
      <button onClick={closeModal}>No(Keep Spot)</button>
    </div>
  )
}

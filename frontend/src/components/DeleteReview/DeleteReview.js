import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteReview.css";
import { removeReviewFunc, reviewMakerFunc } from "../../store/review";
import { setOneSpotDetails } from "../../store/spots";



export default function DeleteReview({review, spotId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const eventHandler = (e) =>{
        e.preventDefault()
        return dispatch(removeReviewFunc(review.id)).then(closeModal).then(dispatch(setOneSpotDetails(spotId)))
    }
    return (
        <div className="sonmod">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this review?</p>

            <button
                onClick={eventHandler}
                className="red"
                type="submit"
            >
                Yes {"(Delete Review)"}
            </button>
            <button
                onClick={() => closeModal()}
                className="blk"
                type="submit"
            >
                No {"(Keep Review)"}
            </button>
        </div>
    )
}

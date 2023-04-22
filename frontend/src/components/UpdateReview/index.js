import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { edit_review_thunk } from "../../store/review";
import { setOneSpotDetails } from "../../store/spots";
import { reviewMakerFunc } from "../../store/review";

export default function UpdateReview({oldReview, spotId}) {
    const dispatch = useDispatch()
    const {id} = useParams()
    const { closeModal } = useModal()
    const [review, setReview] = useState(oldReview.review)
    const [stars,setStars] = useState(oldReview.stars)
    const [validationErrors, setValidationErrors] = useState({
        stars:'',
        review:''
    })

    useEffect(() =>{
        let tofill = async () => {
            setReview(oldReview.review)
            setStars(oldReview.stars)
        }
        tofill()
    },[dispatch, id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const toedit = {
            review,
            stars
        }
        const errors = {}
        if (stars <= 0 || stars > 5) errors.stars = 'Reviews must have 1 to 5 stars';
        if (!review.length) errors.review = 'Review is required';
        if (!Object.values(errors).length){
            const editedreview = await dispatch(edit_review_thunk(oldReview.id, toedit))
            await dispatch(reviewMakerFunc(spotId))
            await dispatch(setOneSpotDetails(spotId))
            closeModal()
        }else{
            setValidationErrors(errors)
        }
    }
    return (
        <div className="sonmoda">
            <h1>Update your review?</h1>
            <form onSubmit={handleSubmit}>
                <label for="review">
                    <textarea
                        name="review"
                        id="review"
                        cols="30"
                        rows="10"
                        placeholder="Leave your review here..."
                        onChange={(e) => setReview(e.target.value)}
                    >
                        {review}
                    </textarea>
                </label>
                <span className='validationErrors'>{validationErrors.review}</span>
                <div className='forTest'>
                    <div class="rate">
                        <input
                            type="radio"
                            id="star5"
                            name="rate"
                            value="5"
                            checked={stars === 5}
                            onChange={() => setStars(5)}
                        />
                        <label for="star5" title="text">
                            5 stars
                        </label>
                        <input
                            type="radio"
                            id="star4"
                            name="rate"
                            value="4"
                            checked={stars === 4}
                            onChange={() => setStars(4)}
                        />
                        <label for="star4" title="text">
                            4 stars
                        </label>
                        <input
                            type="radio"
                            id="star3"
                            name="rate"
                            value="3"
                            checked={stars === 3}
                            onChange={() => setStars(3)}
                        />
                        <label for="star3" title="text">
                            3 stars
                        </label>
                        <input
                            type="radio"
                            id="star2"
                            name="rate"
                            value="2"
                            checked={stars === 2}
                            onChange={() => setStars(2)}
                        />
                        <label for="star2" title="text">
                            2 stars
                        </label>
                        <input
                            type="radio"
                            id="star1"
                            name="rate"
                            value="1"
                            checked={stars === 1}
                            onChange={() => setStars(1)}
                        />
                        <label for="star1" title="text">
                            1 star
                        </label>

                    </div>
                    <div style={{ marginTop: '18px' }}>Stars</div>
                </div>
                <span className='validationErrors'>{validationErrors.stars}</span>
                <button
                    className="submit-button"
                    type="submit"
                >
                    Submit Your Review
                </button>
            </form>
        </div>
    )
}
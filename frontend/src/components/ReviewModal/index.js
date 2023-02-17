import React, {useEffect, useState} from 'react'
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './ReviewModal.css'
import { reviewAdderFunc, reviewMakerFunc  } from '../../store/review';
import { setOneSpotDetails } from '../../store/spots';
export default function ReviewModal({spotId}) {
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState([]);
    const [stars, setStars] = useState(0)
    const { closeModal } = useModal();


    useEffect(() => {
        let sonErrors = [];
        if (review.length < 10) {
            sonErrors.push("Review must be 10 or more characters");
        }
        setErrors(sonErrors);
    }, [review]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const newReview = {
            review,
            stars
        };
        let sonReview = await dispatch(reviewAdderFunc(newReview, spotId))
        await dispatch(reviewMakerFunc(spotId));
        // await dispatch(getSingleSpot(spotId))
        if (sonReview) closeModal();
        dispatch(setOneSpotDetails(spotId))
        return
    };

  return (
      <div className="sonmod">
          <h1>How was your stay?</h1>
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
                  <p>STARS</p>
              </div>
              <button
                  className="submit-button"
                  type="submit"
                  disabled={errors.length === 0 ? false : true}
              >
                  Submit Your Review
              </button>
          </form>
      </div>
  )
}

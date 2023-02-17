import { csrfFetch } from "./csrf"
const GET_SPOT_REVIEWS = 'reviews/GET_REVIEW'
const ADD_NEW_REVIEW = 'reviews/ADD_NEW_REVIEW'
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW'
const reviewMaker = (payload) =>{
    return {
        type:GET_SPOT_REVIEWS,
        payload:payload
    }
}
const reviewAdder = payload => ({
    type: ADD_NEW_REVIEW,
    payload
}) 

const removeReview = (payload) =>{
    return {
        type: REMOVE_REVIEW,
        payload
}
}

export const reviewMakerFunc = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json()
    dispatch(reviewMaker(data))
    return response
}
export const reviewAdderFunc = (newReview, spotId) => async dispatch => {
    console.log("reached addNewReview Thunk")
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(reviewAdder(data));

        return data;
    }
}

export const removeReviewFunc  = (reviewId) => async dispatch =>{
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        // console.log("reached response.ok")
        const details = await response.json();
        // console.log("details from inside thunk", details)
        dispatch(removeReview(reviewId));
    }
}


const initialState = {spot:{}, user:{}}
const reviewReducer = (state = initialState, action) =>{
    let newState;
    switch (action.type) {
        case GET_SPOT_REVIEWS:
            let normalized = {}
            action.payload.Reviews.forEach(review => {
                normalized[review.id] = review
            });
            newState = {...state, spot:normalized}
            return newState   
            
        case ADD_NEW_REVIEW:
          //  newState = {...state, spot:{...state.spot, ...action.payload}}
        
            let spot = state.spot
            spot[action.payload.id] = { ...action.payload }
            newState = {
                ...state,
                spot
            }
            
            return newState
            case REMOVE_REVIEW:
                newState ={...state}
                delete newState.spot[action.payload]
                let result = {
                    ...newState,
                    spot:{...newState.spot}
                }
                return result
        default:
            return state
    }
}
export default reviewReducer
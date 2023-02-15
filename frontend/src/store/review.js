import { csrfFetch } from "./csrf"
const GET_REVIEW = 'reviews/GET_REVIEW'

const reviewMaker = (payload) =>{
    return {
        type:GET_REVIEW,
        payload:payload
    }
}

export const reviewMakerFunc = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json()
    dispatch(reviewMaker(data))
    return response
}
const initialState = {}
const reviewReducer = (state = initialState, action) =>{
    let newState;
    switch (action.type) {
        case GET_REVIEW:
            newState = { ...state }
            action.payload.Reviews.forEach(review => {
                newState[review.id] = review
            });
            
            return newState           
    
        default:
            return state
    }
}
export default reviewReducer
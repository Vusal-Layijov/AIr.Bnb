import { csrfFetch } from "./csrf"
const ONE_SPOT_DETAILS = 'onespotdetails/SET_ONE_SPOT_DETAILS'
const setOneSPotDetails = (spot) => {
    return {
        type: ONE_SPOT_DETAILS,
        singleSpot: spot
    }
}
export const setOneSpotDetails = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    const data = await response.json()
    dispatch(setOneSPotDetails(data))
    return response
}
const initialState = {}
const singleSpotReducer = (state = initialState, action) =>{
    let newState;
    switch (action.type) {
        case ONE_SPOT_DETAILS:
        return {...state, ...action.singleSpot}    
            
    
        default:
           return state
    }
}
export default singleSpotReducer
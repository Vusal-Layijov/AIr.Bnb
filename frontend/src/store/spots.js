import { csrfFetch } from "./csrf"
const SET_SPOTS = 'spots/SET_SPOTS'



const setSpots = (spots) =>{
    return{
        type:SET_SPOTS,
        payload:spots
    }
}



export const setAllSpots = () => async dispatch =>{
    const response = await csrfFetch('/api/spots')
    const data = await response.json()
    dispatch(setSpots(data))
    return response
}



const initialState = {}
const spotsReducer = (state = initialState, action)=>{
let newState;
switch(action.type) {
    case SET_SPOTS:
        newState = {...state}
        action.payload.Spots.forEach(spot => {
            newState[spot.id] = spot;
        });
        return newState
    
    default:
        return state
}
}
export default spotsReducer
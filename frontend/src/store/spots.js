import { csrfFetch } from "./csrf"
const SET_SPOTS = 'spots/SET_SPOTS'
const CREATE_SPOT = 'spots/NEW_SPOT'




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
    return data
}








const setSpots = (spots) =>{
    return{
        type:SET_SPOTS,
        payload:spots
    }
}

const createSpot = (spot) =>{
    return {
        type:CREATE_SPOT,
        spot:spot
    }
}

 

export const setAllSpots = () => async dispatch =>{
    const response = await csrfFetch('/api/spots')
    const data = await response.json()
    dispatch(setSpots(data))
    return response
}

export const createSpotFunc = (spot) => async dispatch =>{
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    })
    if(response.ok){
        const NewSpot = await response.json()

        const forImage = await csrfFetch(`/api/spots/${NewSpot.id}/images`,{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                url: spot.SpotImage,
                preview:true
            })
        })
        console.log('for imageeeee',forImage)
        if(forImage.ok){
            // const ImgData = await forImage.json()
            // const toStore = {...NewSpot, previewImage:ImgData.url}
            const toStore = await dispatch(setOneSpotDetails(NewSpot.id))
            dispatch(createSpot(toStore))
            return toStore
        }
    }
}

const initialState = {allSpots:{}, singleSpot:{}}
const spotsReducer = (state = initialState, action)=>{
let newState;
switch(action.type) {
    case SET_SPOTS:
        newState = {...state, allSpots:{}}
        action.payload.Spots.forEach(spot => {
            newState.allSpots[spot.id] = spot;
        });
        return newState
    case ONE_SPOT_DETAILS:
        newState = {...state, singleSpot:{}}
        newState.singleSpot=action.singleSpot
        return  newState
        
    case CREATE_SPOT:
        console.log('this is action in my reducer', action)
        newState ={
            ...state,
            singleSpot:action.spot
        }  
        return newState;
    default:
        return state
}
}
export default spotsReducer
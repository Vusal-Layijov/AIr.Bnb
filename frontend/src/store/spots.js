import { csrfFetch } from "./csrf"
const SET_SPOTS = 'spots/SET_SPOTS'
const CREATE_SPOT = 'spots/NEW_SPOT'
const CURRENT_USER_SPOTS = 'spots/CURRENT_USER_SPOTS'
const UPDATE_SPOT = '/spots/UPDATE_SPOTS'
const REMOVE_ITEM = "items/REMOVE_ITEM";

const ONE_SPOT_DETAILS = 'onespotdetails/SET_ONE_SPOT_DETAILS'
const setOneSPotDetails = (spot) => {
    return {
        type: ONE_SPOT_DETAILS,
        singleSpot: spot
    }
}
const setSpots = (spots) => {
    return {
        type: SET_SPOTS,
        payload: spots
    }
}

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot: spot
    }
}

const setCurrentUserSpots = (spots) =>{
    return {
        type:CURRENT_USER_SPOTS,
        payload:spots
    }
}

const updateSpot = (spot) =>{
    return {
        type: UPDATE_SPOT,
        spot:spot
    }
}
const remove = (spots) => ({
    type: REMOVE_ITEM,
    payload:spots
});

export const setOneSpotDetails = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    const data = await response.json()
    dispatch(setOneSPotDetails(data))
    return data
}










 

export const setAllSpots = () => async dispatch =>{
    const response = await csrfFetch('/api/spots')
    const data = await response.json()
    dispatch(setSpots(data))
    return response
}

export const setCurrentUserSpotsFunc = () => async dispatch =>{
    const response = await csrfFetch('/api/spots/current')
    const data = await response.json()
    dispatch(setCurrentUserSpots(data))
    return data
}



export const createSpotFunc = (spot,images) => async dispatch =>{
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    })
    let spott= await response.json()
    console.log('spot-------.',spott)
    let spotId=spott.id
    await csrfFetch(`/api/spots/${spotId}/images`,{
        method:"POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            preview:true,
            url:images.preview
        })
    })
    images.others.filter(el=>el.length).forEach(async(img)=>{
        let image = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                preview: false,
                url: img
            })
        })
    })
    return spotId






    // if(response.ok){
    //     NewSpot = await response.json()
        
    //     console.log('formdata----------->', formData.has('images'))
    //     const form = new FormData()
    //     const images = formData.getAll('images')
    //     for(let i =0; i<images.length; i++){
    //         form.append('images',images[i])
    //     }
    //     const forImage = await csrfFetch(`/api/spots/${NewSpot.id}/images`,{
    //         method:'POST',
    //         headers: { 'Content-Type': `multipart/form-data; boundary=${form._boundary}`},
    //         body: form
    //     })
    //     if(forImage.ok){
    //         // const ImgData = await forImage.json()
    //         // const toStore = {...NewSpot, previewImage:ImgData.url}

    //         //for aws
    //         // const toStore = await dispatch(setOneSpotDetails(NewSpot.id))
    //         // dispatch(createSpot(toStore))
    //         return NewSpot.id
    //     }
    // }
}

export const removeSpotFunc = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method:'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    if(response.ok){
        const toStore = await dispatch(setCurrentUserSpotsFunc())
        dispatch(remove(toStore))
        return toStore

    }
}

// export const updateSpotFunc = (spot) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${spot.spotId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(spot),
//     })
//     if (response.ok) {
//         const updatedSpot = await response.json()

//         const forImage = await csrfFetch(`/api/spots/${updatedSpot.id}/images`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 url: spot.SpotImage,
//                 preview: true
//             })
//         })
//         console.log('for imageeeee', forImage)
//         if (forImage.ok) {
//             // const ImgData = await forImage.json()
//             // const toStore = {...NewSpot, previewImage:ImgData.url}
//             const toStore = await dispatch(setOneSpotDetails(updateSpot.id))
//             dispatch(updateSpot(toStore))
//             return toStore
//         }
//     }
// }

export const updateSpotFunc = (spotId, spot,images) => async dispatch => {
    console.log('consoling images', images)
    // console.log('consoling undefined spot', spot.price)
    const response = await csrfFetch(`/api/spots/${spotId}`, {
       
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    })
    if (response.ok) {
        const updatedSpot = await response.json()
        const toStore = await dispatch(setOneSpotDetails(updatedSpot.id))
        dispatch(updateSpot(toStore))
        return toStore
  
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
       // console.log('this is action in my reducer', action)
        newState ={
            ...state,
            singleSpot:action.spot
        }  
        return newState;
    case UPDATE_SPOT:
        newState={
            ...state, singleSpot:action.spot
        }
        return newState
    case CURRENT_USER_SPOTS:
        newState ={...state, allSpots:{}, singleSpot:{}}
        action.payload.Spots.forEach(spot => {
            newState.allSpots[spot.id] = spot;
        });
        return newState
        case REMOVE_ITEM:
        newState = { ...state, allSpots: {}, singleSpot: {} }
        action.payload.Spots.forEach(spot => {
            newState.allSpots[spot.id] = spot;
        });
        return newState

    default:
        return state
}
}
export default spotsReducer
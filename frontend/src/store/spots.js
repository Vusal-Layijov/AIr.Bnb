const SET_SPOTS = 'spots/SET_SPOTS'


const setSpots = (spots) =>{
    return{
        type:SET_SPOTS,
        payload:spots
    }
}



export const setAllSpots = () => async dispatch =>{
    const response = await fetch('/api/spots')
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
        newState ={ ...action.payload}
        return newState
    default:
        return state
}
}
export default spotsReducer
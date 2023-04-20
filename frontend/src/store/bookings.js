import { csrfFetch } from "./csrf"
const GET_BOOKING = 'bookings/GET_BOOKING'
const CREATE_BOOKING = 'bookings/CREATE_BOOKING'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'

const get_booking_action = (payload) => {
    return {
        type:GET_BOOKING,
        payload
    }
}
const create_booking_action = (payload) =>{
    return {
        type: CREATE_BOOKING,
        payload
    }
}
const delete_boking_action = (id) =>{
    return {
        type:DELETE_BOOKING,
        id
    }
}
export const get_booking_thunk = () => async dispatch =>{
    const response = await csrfFetch('/api/bookings/current')
    if (response.ok) {
        const data = await response.json()
        dispatch(get_booking_action(data))
    }
}
export const create_booking_thunk = (spotId, booking) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(booking)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(create_booking_thunk(data))
    }
    return response
}

export const delete_booking_thunk = (id) => async (dispatch) =>{
    const response  = await csrfFetch(`/api/bookings/${id}`)
    if (response.ok) {
        dispatch(delete_boking_action(id))
    }
}

const initialState = {user:{}, spot: {}}

const bookingReducer = (state=initialState,action) =>{
    let newState = { ...state }
    let user = {}
    let spot = {}
    switch (action.type){
        case DELETE_BOOKING:
            delete newState.user[action.id]
            return newState
        case CREATE_BOOKING:
            user=state.user
            user[action.payload.id]=action.payload
            return {
                ...newState,
                user
            }
        case GET_BOOKING:            
            action.payload.Bookings.forEach(booking => user[booking.id]=booking)
            return {
                ...newState,
                user
            }
        default:
            return state
    }
}
export default bookingReducer
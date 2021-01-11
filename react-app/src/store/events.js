
const GET_EVENTS = 'events'



const setEvents = (events) => {
    return {type: GET_EVENTS, payload: events}
}


export const allEvents = () => async(dispatch) => {
    const response = await fetch('/api/events/')

    const resJson = await response.json()
    console.log(resJson)
    dispatch(setEvents(resJson))
    return response
}

const initialState = {events: null}

const eventReducer = (state = initialState, action) => {
    let new_state

    switch(action.type) {
        case GET_EVENTS:
            new_state = Object.assign({}, state)
            new_state.events = action.payload;
            return new_state;
        default:
            return state
    }
}

export default eventReducer
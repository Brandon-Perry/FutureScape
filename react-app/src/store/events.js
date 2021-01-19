
const GET_EVENTS = 'events'
// const RESOLVE_EVENTS = 'resolve-event'

const setEvents = (events) => {
    return {type: GET_EVENTS, payload: events}
}

// const resolveEvents = (event_ids) => {
//     return {type: RESOLVE_EVENTS, payload: event_ids}
// }


export const allEvents = () => async(dispatch) => {
    const response = await fetch('/api/events/')

    const resJson = await response.json()
    // console.log(resJson)
    dispatch(setEvents(resJson))
    return response
}

export const resolveAndUpdateEvents = (event_ids) => async(dispatch) => {
    // console.log('hit resolve and update events')
    const response = await fetch('/api/events/resolve', {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'event_ids':event_ids,
            'return_all_events': true
        })
    })
    // console.log(response)

    const resJson = await response.json()
    // console.log(resJson)

    //Just going to use getEvents since this sends back the same information
    dispatch(setEvents(resJson))
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
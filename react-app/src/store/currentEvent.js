const GET_EVENT = 'event'

const setCurrentEvent = (event) => {
    return {type: GET_EVENT, payload: event}
}

export const getCurrentEvent = (id) => async(dispatch) =>{
    const response = await fetch(`/api/events/${id}`)

    const resJson = await response.json()

    dispatch(setCurrentEvent(resJson))
}

// const initialState = {event: null}

const currentEventReducer = (state = {}, action) => {
    let new_state

    switch(action.type) {
        case GET_EVENT:
            new_state = Object.assign({}, state)
            new_state = action.payload;
            return new_state

        default:
            return state
    }
}

export default currentEventReducer
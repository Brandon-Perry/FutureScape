const GET_EVENT = 'event'
const ADD_PREDICTIONS = 'update-predictions'
const ADD_COMMENT = 'update-comment'

const setCurrentEvent = (event) => {
    return {type: GET_EVENT, payload: event}
}

const addPredictions = (predictions) => {
    return {type: ADD_PREDICTIONS, payload: predictions}
}

const addComment = (comments) => {
    return {type: ADD_COMMENT, payload: comments}
}

export const getCurrentEvent = (id) => async(dispatch) =>{
    const response = await fetch(`/api/events/${id}`)

    const resJson = await response.json()

    dispatch(setCurrentEvent(resJson))
}

export const addAndUpdatePredictions = (user_id, event_id, probabilityYes, probabilityNo) => async(dispatch) => {
    const responseYes = await fetch('/api/predictions/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'user_id': user_id,
            'event_id': event_id,
            'choice_id': 1,
            'probability': probabilityYes
        })
    })
    const responseNo = await fetch('/api/predictions/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'user_id': user_id,
            'event_id': event_id,
            'choice_id': 2,
            'probability': probabilityNo
        })
    })

    
    const resPredictions = await responseNo.json()
    const latestPredictions = resPredictions['predictions']

    dispatch(addPredictions(latestPredictions))
}

export const addAndUpdateComments = (user_id, event_id, comment) => async(dispatch) => {
    const response = await fetch('/api/comments/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'user_id':user_id,
            'event_id':event_id,
            'comment': comment
        })
    })
    const resJson = await response.json()
    const latestComments = resJson['comments']

    dispatch(addComment(latestComments))
}

export const resolveAndUpdateEvent = (event_ids) => async(dispatch) => {
    const response = await fetch('/api/events/resolve', {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'event_ids':event_ids,
            'return_all_events': false
        })
    })

    const resJson = await response.json()

    dispatch(setCurrentEvent(event_ids[0]))
}

// const initialState = {event: null}

const currentEventReducer = (state = {}, action) => {
    let new_state

    switch(action.type) {
        case GET_EVENT:
            new_state = Object.assign({}, state)
            new_state = action.payload;
            return new_state

        case ADD_PREDICTIONS:
            new_state = Object.assign({}, state)
            new_state.predictions = action.payload
            return new_state

        case ADD_COMMENT:
            new_state = Object.assign({}, state)
            new_state.comments = action.payload
            return new_state

        default:
            return state
    }
}

export default currentEventReducer
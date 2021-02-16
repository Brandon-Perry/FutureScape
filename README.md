# FutureScape
*By Brandon Perry*
Check out the live version [here](https://futurescape.herokuapp.com/)

**Check out the live version [here](https://futurescape.herokuapp.com/)**

**Table of Contents**
- [FutureScape](#futurescape)
  - [FutureScape at a Glance](#futurescape-at-a-glance)
  - [Application Architecture and Technologies Used](#application-architecture-and-technologies-used)
  - [Frontend Overview](#frontend-overview)
    - [React](#react)
    - [Redux](#redux)
  - [Backend Overview](#backend-overview)
    - [Authentication and Application Security](#authentication-and-application-security)
    - [Relational Database Design](#relational-database-design)
  - [Conclusion & Next Steps](#conclusion--next-steps)

## FutureScape at a Glance

FutureScape is a prediction market that crowd-sources the probabilities of yes/no questions about future events, such as "Will US GDP grow by 3% in 2021". The market rewards users for how much they corrected the previous prediction towards what the market resolves as. For example, if the previous prediction was 60/40, and the next prediction is 70/30 and the market resolves as yes, then that user is rewarded for moving the market closer to the correct answer. If the event resolves as no, then that user would have been docked points. As a user, you can submit predictions, create new markets for a question, and post comments on a market. Admin users have the additional priviledge of being able to determine what the market should resolve as. 

## Application Architecture and Technologies Used

FutureScape was built with a backend server using the Flask framework, a PostgreSQL database to store all the data, and the Flask-SQLAlchemy extension to incorporate SQLAlchemy ORM into the application.

The frontend was rendered using React, with a Redux store that maintains the whole state throughout the application. Components were styled with CSS.

## Frontend Overview

### React

The frontend was built out using React components and styled with CSS. An example is given below:

```js
const MainEvent = ({event}) => {

    const linkToEvent = `/event/${event.id}`

    let lastYes = null
    let lastNo = null

    if (!event.predictions[event.predictions.length-2]) {
        lastYes = 50
    } else {
        lastYes = event.predictions[event.predictions.length-2].probability
    }

    if (!event.predictions[event.predictions.length-1]) {
        lastNo = 50
    } else {
        lastNo = event.predictions[event.predictions.length-1].probability
    }
    
    return (
        <div className='Main__event' id={event.id} key={event.id}>

            <div className='Main__event_title'>
                <Link to={linkToEvent}><h3>{event.title}</h3></Link> 
            </div>
            <div className='Main__event_graph'>
                <Chart predictions={event.predictions} />
            </div>
            <div className='Main__event_current_predictions'>
                <p><span className='Main__event_yes'>{lastYes}</span> <span className='Main__event_no'>{lastNo}</span></p>
            </div>

            <div className='Main__event_resolved'>
                {event.resolved ? <p>Resolved</p> : <p>Unresolved</p>}
            </div>

        </div>
    )
}

```

### Redux

Redux is used to store the state and share it across the application. Below is an example of the code that's used to get all the events and resolve any events that have either had their conditions met or have met their expiration date.

```js
/const GET_EVENTS = 'events'

const setEvents = (events) => {
    return {type: GET_EVENTS, payload: events}
}

export const allEvents = () => async(dispatch) => {
    const response = await fetch('/api/events/')

    const resJson = await response.json()
    dispatch(setEvents(resJson))
    return response
}

export const resolveAndUpdateEvents = (event_ids) => async(dispatch) => {
    const response = await fetch('/api/events/resolve', {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            'event_ids':event_ids,
            'return_all_events': true
        })
    })

    const resJson = await response.json()

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
```

## Backend Overview

The backend was built using Flask and SQLAlchemy. Below is an example of the route that's used to resolve and score the users based on their predictions. First, it assigns the event its outcome (yes is 1, no is 2). Then, it filters the predictions attached to that event based on its outcome, cycles through those predictions and calculates the points for each user, and then adds those points to each user in the database.

```py
@event_routes.route('/<event_id>/score/<choice_id>', methods=['PUT'])
def handle_scores(event_id, choice_id):

    event = Event.query.get(event_id)
    if int(choice_id) == 1:
        event.outcome = 'Yes'
        db.session.commit()
    if int(choice_id) == 2:
        event.outcome = 'No'
        db.session.commit()
  
    predictions = [prediction.to_dict() for prediction in event.predictions]
 
    chosen_predictions = [prediction for prediction in predictions if prediction['choice_id']== int(choice_id)]
 
    score_dict = {}

    for prediction in chosen_predictions:
     
        score = None
        if chosen_predictions.index(prediction) == 0:
            score = scoring_function(prediction['probability'], 50)
        else:
            previous_index = chosen_predictions.index(prediction) - 1
            previous_prediction = chosen_predictions[previous_index]
            score = scoring_function(prediction['probability'], previous_prediction['probability'])
        
        if prediction['user_id'] not in score_dict:
            score_dict[prediction['user_id']] = score 
        else:
            new_score = score_dict.get(prediction['user_id']) + score
            score_dict.update({prediction['user_id']: new_score })


    for user_id in score_dict.keys():
        current_user = User.query.get(user_id)
        new_score = current_user.points + score_dict[user_id]
        current_user.points = new_score
     
        db.session.commit()
        
    return {'success':'yes'}

```

### Authentication and Application Security

To authenticate a user, I implemented WTForms and used Flask-WTForms to incorporate it into the application. The validations used came from WTForms. Users' passwords were incremented using the Werkzeug library.



## Conclusion & Next Steps

This was my capstone project at App Academy and was the second project to feature Flask/SQLAlchemy and third to use React. There were plenty of challenges to overcome, particularly on the backend since there were so many nested objects. However, I really enjoyed working through and resolving them, and I will continue working on the application. In the future, I want to implement:

* Web-sockets so predictions and events are updated in real-time to users without refresh.
* Pagination for the main applicaiton page to handle more events
* Refactor the exising code to include wrappers that handle unpacking of information and standardize information intake of existing features so that future edits are faster and cleaner. For example: Object1 -> WrapperForObj1 -> Feature(input); Object2 -> WrapperForObj2 -> Feature(input)

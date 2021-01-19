import React from 'react';
import {Link} from 'react-router-dom'



const MainEvent = ({event}) => {

    const linkToEvent = `/event/${event.id}`

    const lastYes = event.predictions[event.predictions.length-2].probability
    const lastNo = event.predictions[event.predictions.length-1].probability
    
    return (
        <div className='Main__event' id={event.id}>

            <div className='Main__event_title'>
                <Link to={linkToEvent}><h3>{event.title}</h3></Link> 
            </div>
            <div className='Main__event_graph'>
                <p>Graph</p>
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

export default MainEvent
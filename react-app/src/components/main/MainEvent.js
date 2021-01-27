import React from 'react';
import {Link} from 'react-router-dom'

import Chart from './Chart'


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
        <div className='Main__event' id={event.id}>

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

export default MainEvent
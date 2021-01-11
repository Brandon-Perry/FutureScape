import React from 'react';



const MainEvent = ({event}) => {
    
    return (
        <div className='Main__event' id={event.id}>

            <div className='Main__event_title'>
                <h3>{event.title}</h3>
            </div>
            <div className='Main__event_graph'>
                <p>Graph</p>
            </div>
            <div className='Main__event_current_predictions'>
                <p>Current Predictions</p>
            </div>

            <div className='Main__event_resolved'>
                <p>Resolved?</p>
            </div>

        </div>
    )
}

export default MainEvent
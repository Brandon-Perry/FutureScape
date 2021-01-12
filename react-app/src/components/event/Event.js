import React from 'react';
import {useDispatch} from 'react-redux'
import {useParams} from 'react-router-dom'

import * as currentEventActions from '../../store/currentEvent'

const Event = () => {
    let {eventId} = useParams();

    const dispatch = useDispatch()

    dispatch(currentEventActions.getCurrentEvent(eventId))
    
    return (
        <div className='Event__container'>
            
            <div className='Event__title'>
                
            </div>

            <div className='Event__description_graph_container'>
                <div className='Event__description'>

                </div>
                <div className='Event__graph'>

                </div>
            </div>

            <div className='Event__predictions_container'>

            </div>

            <div className='Event__comments_container'>

            </div>

        </div>
    )
}

export default Event
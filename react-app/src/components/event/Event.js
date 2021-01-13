import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

import './Event.css'

import * as currentEventActions from '../../store/currentEvent'

const Event = () => {
    let {eventId} = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(currentEventActions.getCurrentEvent(eventId))
        
    }, [dispatch])

    const eventInfo = useSelector((state) => state.currentEvent)

    const displayComment = (comment) => {
        return (
            <div className='Event__comment' id={comment.id}>
                <div className='Event__comment_name'>
                    <p className='Event__comment_username'>
                        {comment.user.username}
                    </p>
                </div>
                <div className='Event__comment_text'>
                    <p>{comment.comment}</p>
                </div>
            </div>
        )
    }

    const displayPredictions = (prediction) => {
        return (
            <div className='Event__prediction'>
                <div className='Event__prediction_yes'>
                    
                </div>
                <div className='Event__prediction_no'>

                </div>
            </div>
        )
    }
    
    return (
        <div className='Event__container'>
            
            <div className='Event__title'>
                <h2>{eventInfo.title}</h2>
            </div>

            <div className='Event__description_graph_container'>
                <div className='Event__description'>
                    <p>{eventInfo.description}</p>
                </div>
                <div className='Event__graph'>
                    <p>Graph</p>
                </div>
            </div>

            <div className='Event__predictions_container'>

            </div>

            <div className='Event__comments_container'>
                {eventInfo.comments ? eventInfo.comments.map((comment) => {
                    return displayComment(comment)
                }) : null}
            </div>

        </div>
    )
}

export default Event
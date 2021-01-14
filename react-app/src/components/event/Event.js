import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import Slider from '@material-ui/core/Slider'
import {createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider} from '@material-ui/styles'

import './Event.css'

import * as currentEventActions from '../../store/currentEvent'

const Event = () => {
    let {eventId} = useParams();
    const dispatch = useDispatch()
    
    const [probabilityYes, setProbabilityYes] = useState(50)
    const [probabilityNo, setProbabilityNo] = useState(50)
    const [userList, setUserList] = useState(null)
    const [yesList, setYesList] = useState(null)
    const [noList, setNoList] = useState(null)
    const [pointsYes, setPointsYes] = useState(null)
    const [pointsNo, setPointsNo] = useState(null)
    const eventInfo = useSelector((state) => state.currentEvent)
    
    useEffect(() => {
        dispatch(currentEventActions.getCurrentEvent(eventId))

        
    }, [dispatch])
    
    
    useEffect(()=> {
        if (!eventInfo.predictions) return
        const listOfUsers = eventInfo.predictions.filter(prediction => {
            if (prediction.choice_id == 1) {
                
                return prediction
            }
        })
        setUserList(listOfUsers.map(prediction => prediction.users.username))
    
        const listOfYes = eventInfo.predictions.filter(prediction => {
            if (prediction.choice_id == 1) {
                return prediction
            }
        })
        setYesList(listOfYes.map(prediction => prediction.probability))
    
        const listOfNo = eventInfo.predictions.filter(prediction => {
            if (prediction.choice_id == 2) {
                return prediction
            }
        })
        setNoList(listOfNo.map(prediction => prediction.probability))

    }, [eventInfo])
   
    useEffect(() => {
        if (!yesList || !noList) return
        setPointsYes(calcScore(probabilityYes, yesList[yesList.length-1]))
        setPointsNo(calcScore(probabilityNo, noList[noList.length-1]))
    })

    const muiTheme = createMuiTheme({
        overrides: {
            MuiSlider: {
                thumb: {
                    color: 'blue'
                },
                colorPrimary: {
                    color: 'red'
                },
                track: {
                    color: 'green'
                }

            }
        }
    })


    const calcScore = (currentValue, previousValue) => {
        return Math.round(100 * Math.log2(currentValue/previousValue))
    }

    const changeProbabilityYes = (e, newValue) => {
        
        setProbabilityYes(newValue)
        setProbabilityNo(100 - newValue)
    }



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

    const displayYesPredictions = () => {
        return yesList.map((prediction) => {
            
            return (
                <div className='Event__prediction_yes'>
                    <p>{prediction}</p>
                </div>
            )
            
        })
    }

    const displayNoPredictions = () => {
        return noList.map((prediction) => {
            
            return (
                <div className='Event__prediction_no'>
                    <p>{prediction}</p>
                </div>
            )
            
        })
    }

    const displayUsernamePredictions = () => {
        return userList.map((username) => {
            
            return (
                <div className='Event__prediction_username'>
                    <p>{username}</p>
                </div>
            )
            
        })
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
                <div className='Event__prediction_username_container'>
                    {userList ? displayUsernamePredictions() : null}
                </div>
                <div className='Event__prediction_yes_container'>
                    {yesList ? displayYesPredictions() : null}
                </div>
                <div className='Event__prediction_no_container'>
                    {noList ? displayNoPredictions() : null}
                </div>
            </div>

            <div className='Event__user_prediction_container'>
                {/* {probabilityYes}
                {probabilityNo} */}
                {pointsYes}
                {pointsNo}

                <ThemeProvider theme={muiTheme}>
                    <Slider 
                        className='Event__slider'
                        step={1} 
                        min={1} 
                        max={99} 
                        valueLabelDisplay='on'
                        defaultValue={50}
                        onChange={changeProbabilityYes}
                        marks />

                </ThemeProvider>
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
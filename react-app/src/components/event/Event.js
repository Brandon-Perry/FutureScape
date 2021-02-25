import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import Slider from '@material-ui/core/Slider'
import {createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider} from '@material-ui/styles'

import './Event.css'

import * as currentEventActions from '../../store/currentEvent'
import Chart from './Chart'



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
    const [commentText, setCommentText] = useState('')
    const eventInfo = useSelector((state) => state.currentEvent)
    const userInfo = useSelector((state) => state.session.user)
    
    useEffect(() => {
        dispatch(currentEventActions.getCurrentEvent(eventId))

        
    }, [dispatch])

  
    useEffect(() => {
        checkTimes()
        let checkInterval = setInterval(()=> checkTimes(), 60000)
        return function cleanupInterval() {
            clearInterval(checkInterval)
        }
    },[eventInfo])
    
    
    useEffect(()=> {
        if (!eventInfo.predictions) return
        const listOfUsers = eventInfo.predictions.filter(prediction => {
            if (prediction.choice_id === 1) {
                
                return prediction
            }
        })
        setUserList(listOfUsers.map(prediction => prediction.users.username))
    
        const listOfYes = eventInfo.predictions.filter(prediction => {
            if (prediction.choice_id === 1) {
                return prediction
            }
        })
        setYesList(listOfYes.map(prediction => prediction.probability))
    
        const listOfNo = eventInfo.predictions.filter(prediction => {
            if (prediction.choice_id === 2) {
                return prediction
            }
        })
        setNoList(listOfNo.map(prediction => prediction.probability))


        let scroller = document.getElementsByClassName('Event__comments_container')
        scroller[0].scrollTop = scroller[0].scrollHeight

    }, [eventInfo])
   
    useEffect(() => {
        if (!yesList || !noList) return
        if (eventInfo.predictions.length === 0) {
            setPointsYes(calcScore(probabilityYes, 50))
            setPointsNo(calcScore(probabilityNo, 50))
        } else {
            setPointsYes(calcScore(probabilityYes, yesList[yesList.length-1]))
            setPointsNo(calcScore(probabilityNo, noList[noList.length-1]))
        }
    }, [probabilityNo, probabilityYes])

    const checkTimes = () => {
        const is_expired = eventInfo.resolved
        if (is_expired) return
        
        const now = new Date()
        if (now.getTime() >= new Date(eventInfo.expires).getTime()) {
            dispatch(currentEventActions.resolveAndUpdateEvent([eventInfo.id]))
        } 

    }


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

    const submitPrediction = async (e) => {
        e.preventDefault()
        

        dispatch(currentEventActions.addAndUpdatePredictions(
            userInfo.id,
            eventInfo.id,
            probabilityYes,
            probabilityNo
        ))
    }


    const calcScore = (currentValue, previousValue) => {
        return Math.round(100 * Math.log2(currentValue/previousValue))
    }

    const changeProbabilityYes = (e, newValue) => {
        
        setProbabilityYes(newValue)
        setProbabilityNo(100 - newValue)
    }

    const updateCommentText = (e) => {
        e.preventDefault()

        setCommentText(e.target.value)
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

    const submitComment = (e) => {
        e.preventDefault()
        if (commentText !== '') {
            dispatch(currentEventActions.addAndUpdateComments(userInfo.id, eventInfo.id, commentText))
        } else {
            return
        }
    }

    const scorePredictionsYes = async() => {
        
        if (!eventInfo.resolved) {
            dispatch(currentEventActions.resolveAndUpdateEvent([eventInfo.id]))
        }
        const response = await fetch(`/api/events/${eventInfo.id}/score/1`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'nothing needed':null
            })
        })

        const resJson = await response.json()

        return resJson

    }

    const scorePredictionsNo = async() => {
        
        if (!eventInfo.resolved) {
            dispatch(currentEventActions.resolveAndUpdateEvent([eventInfo.id]))
        }

        const response = await fetch(`/api/events/${eventInfo.id}/score/2`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'nothing needed':null
            })
        })

        const resJson = await response.json()

        return resJson

    }

    const resolvedStatus = () => {

        

        if (eventInfo.outcome === null) {
            return <span className='Event__resolved_pending'>Resolved: Pending Admin Action</span>
        } else if (eventInfo.outcome === 'Yes') {
            return <span className='Event__resolved_yes'>Resolved: Yes</span>
        } else if (eventInfo.outcome ==='No') {
            return <span className='Event__resolved_no'>Resolved: No</span>
        }

    }
    
    return (
        <div className='Event__container'>
            
            <div className='Event__title'>
                <h2>
                    {eventInfo.title} {eventInfo.resolved ? resolvedStatus() : null}
                </h2>
                
            </div>

            <div className='Event__description_graph_container'>
                <div className='Event__description'>
                    <p>{eventInfo.description}</p>
                </div>
                <div className='Event__graph'>
                    {yesList && noList ? <Chart predictions={eventInfo.predictions} /> : null}
                </div>
            </div>

            <div className='Event__predictions_container'>
                <div className='Event__prediction_username_container'>
                    <div className='Event__prediction_username'>
                        <p>HOUSE</p>
                    </div>
                    {userList ? displayUsernamePredictions() : null}
                </div>
                <div className='Event__prediction_yes_container'>
                    <div className='Event__prediction_yes'>
                        <p>50</p>
                    </div>
                    {yesList ? displayYesPredictions() : null}
                </div>
                <div className='Event__prediction_no_container'>
                    <div className='Event__prediction_yes'>
                        <p>50</p>
                    </div>
                    {noList ? displayNoPredictions() : null}
                </div>
            </div>

            <div className='Event__user_prediction_container'>
                <div className='Event__yes_no_points'>
                    <div><p>{pointsYes} points if event resolves <span className='Event__yespoints'>Yes</span></p></div>
                    <div><p>{pointsNo} points if event resolves <span className='Event__nopoints'>No</span></p></div>

                </div>

                <ThemeProvider theme={muiTheme}>
                    <Slider 
                        className='Event__slider'
                        step={1} 
                        min={1} 
                        max={99} 
                        valueLabelDisplay='on'
                        defaultValue={50}
                        onChange={changeProbabilityYes}
                        disabled={eventInfo.resolved}
                        marks />

                </ThemeProvider>
            </div>

            <div className='Event__submit_button'>
                <button disabled={eventInfo.resolved} onClick={submitPrediction}>Submit Prediction</button>
            </div>

            {userInfo.admin ? 
                <div className='Event__admin_actions'>
                    <button onClick={scorePredictionsYes}>Score as Yes</button>
                    <button onClick={scorePredictionsNo}>Score as No</button>
                </div>
            : null}

            <div className='Event__comments_container'>
                {eventInfo.comments ? eventInfo.comments.map((comment) => {
                    return displayComment(comment)
                }) : null}
                <textarea
                    onChange={updateCommentText} 
                    placeholder='type here' 
                    cols={80}
                    rows={5}
                />
                <div>
                    <button onClick={submitComment}>Post Comment</button>
                </div>
            
            </div>

        </div>
    )
}

export default Event
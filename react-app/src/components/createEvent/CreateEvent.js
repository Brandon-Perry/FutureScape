import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import TextField from '@material-ui/core/TextField'
import MomentUtils from '@date-io/moment';
import Moment from 'moment'
import {KeyboardDatePicker, KeyboardDateTimePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'

import './CreateEvent.css'


const CreateEvent = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [expires, setExpires] = useState(null)
    const [category, setCategory] = useState('')

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    const updateExpires = (date, value) => {
        // console.log(date.toISOString())
        setExpires(date.toISOString())
        // console.log(new Date(expires))
    }
    
    return (
        <div className='createEvent__container'>
            <form className='createEvent__form'>
                <input 
                value={title}
                onChange={updateTitle}
                placeholder='Event Title'
            />
            <input
                type='text'
                value={description}
                onChange={updateDescription}
                placeholder='Describe Your Event in Detail'
            />
            
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container justify="space-around">
                    <KeyboardDateTimePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Pick Date and Time for Event to Expire"
                        value={expires}
                        onChange={updateExpires}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                    }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <input
                // onChange={}
                placeholder='Category'
            />

            </form>
        </div>
    )
    
}

export default CreateEvent
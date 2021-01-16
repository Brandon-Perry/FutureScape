import React, {useState, useEffect} from 'react';
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
    const [categories, setCategories] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        (async() => {
            const response = await fetch('/api/categories/')
            const resJson = await response.json()
            const names = resJson['categories'].map(el => {
                return el.name
            })
            setCategories([...names])
            console.log(categories)

            
        })()
    }, [])

    const makeItem = (el) => {
        return <option key={el} value={el}>{el}</option>
    }

    const updateSelectedCategory = (e) => {
        setSelectedCategory(e.target.value)
    }
    

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

    const returnTomorrowDate = () => {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        return tomorrow.toISOString()
        //Doesn't seem to work, will come back to
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
                        disablePast={true}
                        maxDate={returnTomorrowDate}
                        value={expires}
                        onChange={updateExpires}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                    }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <select name='categories' value={selectedCategory} onChange={updateSelectedCategory}>
                        {Object.values(categories).map(el => {
                            return makeItem(el)
                        })}
                    </select>

            </form>
            <button>Submit</button>
        </div>
    )
    
}

export default CreateEvent
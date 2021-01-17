import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import TextField from '@material-ui/core/TextField'
import MomentUtils from '@date-io/moment';
import Moment from 'moment'
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import Grid from '@material-ui/core/Grid'

import './CreateEvent.css'


const CreateEvent = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [expires, setExpires] = useState(null)
    const [categories, setCategories] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)

    let history = useHistory()

    useEffect(() => {
        (async() => {
            const response = await fetch('/api/categories/')
            const resJson = await response.json()
            // console.log(resJson)
            let categoryObjs = resJson.categories.filter(category => {
                if (category.name !== 'All') {
                    return category
                }
            })
            setCategories(categoryObjs)
            // console.log(categories)
            setSelectedCategory(categoryObjs[0].id)

            
        })()
    }, [])

    const makeItem = (el, id) => {
        return <option key={id} value={id}>{el}</option>
    }

    const updateSelectedCategory = (e) => {
        const index = e.target.selectedIndex;
        const element = e.target.childNodes[index]
        const elementValue = element.getAttribute('value')
        setSelectedCategory(elementValue)
    }
    

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    const updateExpires = (date, value) => {
        // console.log(date)
        setExpires(date.toISOString())
        console.log(Date(date))
        // console.log(new Date(expires))
    }

    const returnTomorrowDate = () => {
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        return tomorrow.toISOString()
        //Doesn't seem to work, will come back to
    }

    const submitEvent = async (e) => {
        e.preventDefault()
        console.log(expires)

        const response = await fetch('/api/events/', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'title': title,
                'description': description,
                'expires': expires,
                'category_id':selectedCategory
            })
        })

        const resJson = await response.json()
        if (response.ok) {
            
            history.push(`/event/${resJson.id}`)
        }
        

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
            <select name='categories' onChange={updateSelectedCategory}>
                        {categories ? categories.map(el => {
                            return makeItem(el.name, el.id)
                        }) : null}
                    </select>

            </form>
            <button onClick={submitEvent}>Submit</button>
        </div>
    )
    
}

export default CreateEvent
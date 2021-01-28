import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'

import MomentUtils from '@date-io/moment';
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
            let categoryObjs = resJson.categories.filter(category => {
                if (category.name !== 'All') {
                    return category
                }
            })
            setCategories(categoryObjs)
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
        setExpires(date.toISOString())
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
                <textarea
                    type='text'
                    value={description}
                    onChange={updateDescription}
                    rows={5}
                    placeholder="Describe your event in detail. It's best to include specifics, such as edge cases, sources, and timezones. The more the better!"
                />
                <div>

                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDateTimePicker
                                disableToolbar
                                variant="inline"
                                ampm={false}
                                format="MM/DD/yyyy HH:mm UTC"
                                margin="normal"
                                id="date-picker-inline"
                                label="Event Ends"
                                disablePast={true}
                                value={expires}
                                onChange={updateExpires}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                            }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>

                </div>
                <select name='categories' onChange={updateSelectedCategory}>
                            {categories ? categories.map(el => {
                                return makeItem(el.name, el.id)
                            }) : null}
                </select>

                <button onClick={submitEvent}>Submit</button>
            </form>
        </div>
    )
    
}

export default CreateEvent
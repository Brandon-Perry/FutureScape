import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import TextField from '@material-ui/core/TextField'

import './CreateEvent.css'


const CreateEvent = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [expires, setExpires] = useState('')
    const [category, setCategory] = useState('')

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const updateDescription = (e) => {
        setDescription(e.target.value)
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
            <TextField 
                id='expiration-date'
                label='When will this event resolve?'
                type='datetime'
            />
            <input
                // onChange={}
                placeholder='Category'
            />

            </form>
        </div>
    )
    
}

export default CreateEvent
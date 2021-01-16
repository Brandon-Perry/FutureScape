import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import './Main.css'

import * as eventActions from '../../store/events'
import MainEvent from './MainEvent'

const Main = () => {

    const [showOnlyUnresolved, setShowOnlyUnresolved] = useState(false)
    const [sortBy, setSortBy] = useState('popular')
    const [categories, setCategories] = useState('None')
    const [filterCategory, setFilterCategory] = useState(null)
    const [searchTerm, setSearchTerm] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const events = useSelector((state) => state.events.events)

    const dispatch = useDispatch();

    const changeOnlyResolved = () => {
        setShowOnlyUnresolved(!showOnlyUnresolved)
    }

    const changeSortBy = (e) => {
        setSortBy(e.target.value)
    }

    useEffect(() => {
        (async() => {
            dispatch(eventActions.allEvents())
            const response = await fetch('/api/categories/')
            const resJson = await response.json()
            console.log(resJson)
            const names = resJson['categories'].map(el => {
                return el.name
            })
            setCategories([...names])

            setLoaded(true)
            
        })()
    }, [])

    const makeItem = (el) => {
        return <option key={el} value={el}>{el}</option>
    }

    const changeFilterCategory = (e) => {
        setFilterCategory(e.target.value)
    }
    
    const changeSearchTerm = (e) => {
        if (e.target.value === '') {
            setSearchTerm(null)
        } else {
            setSearchTerm(e.target.value)
        }
    }


    return (
        <div className='Main__container'>
            <div className='Main__settings_container'>
                <div className='Main__settings_resolved'>
                    <label>Show Only Unresolved</label>
                    <input type='checkbox' onChange={changeOnlyResolved} />
                </div>
                <div className='Main__settings_sort'>
                    <label>Sort by:</label>
                    <select onChange={changeSortBy}>
                        <option value='popular'>Popular</option>
                        <option value='recent'>Recent</option>
                        <option value='oldest'>Oldest</option>
                    </select>
                </div>
                <div className='Main__settings_categories'>
                    <label>Categories</label>
                    <select name='categories' onChange={changeFilterCategory}>
                        {Object.values(categories).map(el => {
                            return makeItem(el)
                        })}
                    </select>
                </div>
                <div className='Main__settings_search'>
                    <input placeholder='Search' onChange={changeSearchTerm}></input>
                </div>
            </div>


            <div className='Main__events_container'>
                {events ? events.map((el) => (
                    <MainEvent event={el} />
                )) : null}
            </div>
        </div>
    )
}

export default Main
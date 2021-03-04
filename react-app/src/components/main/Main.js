import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'

import './Main.css'

import * as eventActions from '../../store/events'
import MainEvent from './MainEvent'

const Main = () => {

    const [showOnlyUnresolved, setShowOnlyUnresolved] = useState(false)
    const [sortBy, setSortBy] = useState('popular')
    const [categories, setCategories] = useState('None')
    const [filterCategory, setFilterCategory] = useState('All')
    const [searchTerm, setSearchTerm] = useState(null)
    const [eventsDisplay, setEventsDisplay] = useState(null)
    const events = useSelector((state) => state.events.events)
    let eventsRef = useRef(null)

    const dispatch = useDispatch();

    //Use Effects

    useEffect(() => {
        let intervalChecker;
        (async() => {
            dispatch(eventActions.allEvents())
                
            const response = await fetch('/api/categories/')
            const resJson = await response.json()
            const names = resJson['categories'].map(el => {
                return el.name
            })
            setCategories([...names])


            intervalChecker = setInterval(() => checkTimes(), 60000)
           
            
        })()

        return function clearTimer() {
            clearInterval(intervalChecker)
        }
    }, [])

    useEffect(() => {
        displayFilter()
        eventsRef.current = events
        console.log(eventsDisplay)
        console.log('events', events)
        console.log(sortBy)
    }, [events, filterCategory, searchTerm, sortBy, showOnlyUnresolved])






    //Services and more complex blocks

    const checkTimes = () => {
        if (!eventsRef.current) return
        const now = new Date()

        const unresolved_events = eventsRef.current.filter(event => !event.resolved)

        const toResolveEvents = unresolved_events.filter(event => {
            if (now.getTime() >= new Date(event.expires).getTime() && !event.resolved) {
                return event
            }
        })


        if (toResolveEvents.length) {
            
            let event_ids = []
            toResolveEvents.forEach(event => event_ids.push(event.id))
    
            dispatch(eventActions.resolveAndUpdateEvents(event_ids))
        }

    }

    
    const displayFilter = () => {

        
        if (!events) return

        let sortedEvents = null

        if (sortBy === 'popular') {
            console.log('hit popular')
            sortedEvents = events.slice().sort((a,b) => {
                const created_atA = new Date(a['created_at'])
                const created_atB = new Date(b['created_at'])

                const timeElapsedA = Date.now() - created_atA.getTime()
                const timeElapsedB = Date.now() - created_atB.getTime()
                
                const scoreA = Math.max(a.predictions.length,1) / Math.log10(timeElapsedA)
                const scoreB = Math.max(b.predictions.length,1) / Math.log10(timeElapsedB)
                
                
                return scoreB - scoreA
            })
        }

        if (sortBy === 'recent') {

            sortedEvents = events.slice().sort((a,b) => {
                const created_atA = new Date(a['created_at'])
                const created_atB = new Date(b['created_at'])
                const timeElapsedA = Date.now() - created_atA.getTime()
                
                const timeElapsedB = Date.now() - created_atB.getTime()
                
                return timeElapsedA - timeElapsedB
            })
        }

        if (sortBy === 'oldest') {

            sortedEvents = events.slice().sort((a,b) => {
                const created_atA = new Date(a['created_at'])
                const created_atB = new Date(b['created_at'])
                const timeElapsedA = Date.now() - created_atA.getTime()
                
                const timeElapsedB = Date.now() - created_atB.getTime()
                
                return timeElapsedB - timeElapsedA
            })
        }

        if (filterCategory !== 'All') {

            sortedEvents = sortedEvents.filter(event => {
                if (event.category.name === filterCategory) {
                    return event
                }
            })
        }

        if (showOnlyUnresolved) {
            sortedEvents = sortedEvents.filter(event => {
                if (!event.resolved) {
                    return event
                }
            })
        }

        if (searchTerm) {
            sortedEvents = sortedEvents.filter(event => {
                if (event.title.includes(searchTerm) || event.description.includes(searchTerm)) {
                    return event
                }
            })
        }
        console.log('sortedEvents', sortedEvents)
        setEventsDisplay(sortedEvents)
        

    }
  
  
        
    
    //Use State Helper Functions


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

    const changeOnlyResolved = () => {
        setShowOnlyUnresolved(!showOnlyUnresolved)
    }

    const changeSortBy = (e) => {
        setSortBy(e.target.value)
    }


    //Small Helper Functions

    const makeItem = (el) => {
        return <option key={el} value={el}>{el}</option>
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
                {eventsDisplay ? eventsDisplay.map((el) => (
                    <MainEvent event={el} />
                )) : null}
            </div>
          
        </div>
    )
}

export default Main
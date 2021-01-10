import React, {useEffect, useState} from 'react';

import './Main.css'

const Main = () => {

    const [showOnlyUnresolved, setShowOnlyUnresolved] = useState(false)
    const [sortBy, setSortBy] = useState('popular')
    const [categories, setCategories] = useState('None')


    const changeOnlyResolved = () => {
        setShowOnlyUnresolved(!showOnlyUnresolved)
    }

    const changeSortBy = (e) => {
        setSortBy(e.target.value)
    }

    useEffect(() => {
        (async() => {
            const response = await fetch('/api/categories/')
            const resJson = await response.json()
            const names = resJson['categories'].map(el => {
                return el.name
            })
            console.log(resJson)
            setCategories([...names])
        })()
    }, [])

    const makeItem = (el) => {
        return <option value={el}>{el}</option>
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
                    <select name='categories'>
                        {/* {console.log(typeof categories)} */}
                        {Object.values(categories).map(el => {
                            return makeItem(el)
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Main
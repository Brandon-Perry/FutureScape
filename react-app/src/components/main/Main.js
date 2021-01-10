import React, {useState} from 'react';

import './Main.css'

const Main = () => {

    const [showOnlyUnresolved, setShowOnlyUnresolved] = useState(false)
    const [sortBy, setSortBy] = useState('popular')


    const changeOnlyResolved = () => {
        setShowOnlyUnresolved(!showOnlyUnresolved)
    }

    const changeSortBy = (e) => {
        setSortBy(e.target.value)
    }

    const returnCategories = async () => {
        const response = await fetch('/api/categories/')
        const resJson = await response.json()
        console.log(resJson)
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
                </div>
            </div>
        </div>
    )
}

export default Main
import React from 'react';
import {useSelector} from 'react-redux'

import './NavBar.css'

import LogoutButton from './auth/logout'
import { Link, Redirect } from 'react-router-dom';


const NavBar = () => {
    const currentUser= useSelector((state) => state.session.user)
    
    return(
        <div className='NavBar__container'>
            <Link to='/app'>
                <div className='NavBar__logo'>
                    <img src={require('../assets/logo_nav.png')} />
                </div>
            </Link>
            <div className='NavBar__user_logout_container'>
                <div className='NavBar__create_event'>
                    <Link to='/create_event'>Create Event</Link>
                </div>
                <div className='NavBar__user'>
                    <p>{currentUser.username}: {currentUser.points}</p>
                </div>
                <div className='NavBar__logout'>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}

export default NavBar
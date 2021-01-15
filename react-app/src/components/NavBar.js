import React from 'react';
import {useSelector} from 'react-redux'

import './NavBar.css'

import LogoutButton from './auth/logout'


const NavBar = () => {
    const currentUserName = useSelector((state) => state.session.user.username)
    
    return(
        <div className='NavBar__container'>
            <div className='NavBar__logo'>
                Logo
            </div>
            <div className='NavBar__user_logout_container'>
                <div className='NavBar__user'>
                    {currentUserName}
                </div>
                <div className='NavBar__logout'>
                    <LogoutButton />
                </div>
            </div>
        </div>
    )
}

export default NavBar
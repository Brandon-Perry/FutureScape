import React from 'react';

import './splashpagestyle.css'

const SplashFooter = () => {
    return (
        <div className='splash-footer'>
            <div className='splash-footer__github'>
               <a href='https://github.com/Brandon-Perry/FutureScape'>
                   <img src={require('../../assets/github_logo.png')} alt={'github logo link'}/></a> 
            </div>
        </div>
    )
}

export default SplashFooter
import React from 'react';
// import Date

import './Footer.css'

const SplashFooter = () => {
    const currentDate = new Date()
    return (
        <div className='splash-footer'>
            <div className='splash-footer__links'>
               <a href='https://github.com/Brandon-Perry/FutureScape'>
                   <img src={require('../assets/github_logo.png')} alt={'github logo link'}/>
                </a> 
                <a href='https://www.linkedin.com/in/brandon-perry/'>
                    <img src={require('../assets/linkedin_logo.png')} alt={'linkedin logo link'} />
                </a>
                <a href=''>
                    <img src={require('../assets/website.png')} alt={'linkedin logo link'} />
                </a>
            </div>
            <div className='splash-footer__copyright'>
                Copyright {currentDate.getFullYear()}
            </div>
        </div>
    )
}

export default SplashFooter
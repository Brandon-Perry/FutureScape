import React from 'react'

import './splashpagestyle.css'

import SplashFooter from './splashfooter'
import SignUpForm from '../auth/signup'


const SplashPage = () => {
    return (
        <div>
            <div className='splash-container'>
                <div className='splash-main'>
                    <h1 className='splash-title'>FutureScape</h1>
                    <p className='splash-subtitle'>Know Your Future</p>
                    <div className='splash-text'>
                        <p classname='about'>
                            FutureScape is an open source prediction market that uses crowd-sourced
                            predictions to create estimates about what will happen in the world. 
                            From global affairs to production numbers, find out what will happen now
                            by signing up today!
                        </p>
                    </div>
                    <SignUpForm />
                    <div>
                        <p>Or, take a peek</p>
                    </div>
                    <div>
                        <button>Demo Sign-In</button>
                    </div>
                </div>
            </div>
            <SplashFooter />
        </div>
        
    )
}

export default SplashPage
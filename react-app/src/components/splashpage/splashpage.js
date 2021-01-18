import React, {useState} from 'react'

import './splashpagestyle.css'

import SplashFooter from './splashfooter'
import SignUpForm from '../auth/signup'
import LoginForm from '../auth/login'

const SplashPage = () => {
    const [loginState, setLoginState] = useState(false)


    const changeLoginState = (e) => {
        e.preventDefault()
        setLoginState(!loginState)
    }


    return (
        <div>
            <div className='splash-container'>
                <div className='splash-login__buton'>
                    
                </div>
                <div className='splash-main'>
                    <div className='splash-title'>
                        <img src={require('../../assets/logo_splash.png')} />
                    </div>

                    <div className='splash-text'>
                        <p classname='about'>
                            FutureScape is an reputation based prediction market that uses crowd-sourced
                            predictions to create estimates about what will happen in the world. 
                            From global affairs to production numbers, find out what will happen now
                            by signing up today!
                        </p>
                    </div>

                    <div className='splash-form'>
                        {loginState ? <LoginForm /> : <SignUpForm />}
                    </div>
                    <div className='splash-buttons'>
                        <div>
                            <button onClick={changeLoginState}>{!loginState ? 'Have an Account Already?' : 'Create an Account'}</button>
                        </div>
                        <div>
                            <button>Demo Sign-In</button>
                        </div>
                    </div>

                   
                </div>
            </div>
            <SplashFooter />
        </div>
        
    )
}

export default SplashPage
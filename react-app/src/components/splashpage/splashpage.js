import React, {useState} from 'react'
import { useDispatch } from 'react-redux'

import './splashpagestyle.css'

import SplashFooter from './splashfooter'
import SignUpForm from '../auth/signup'
import LoginForm from '../auth/login'
import * as sessionActions from '../../store/session'

const SplashPage = () => {
    const [loginState, setLoginState] = useState(false)

    const dispatch = useDispatch()


    const changeLoginState = (e) => {
        e.preventDefault()
        setLoginState(!loginState)
    }

    const demoLogin = (e) => {
        e.preventDefault()

        setLoginState(true)

        return dispatch(sessionActions.login({'email': 'demo@demo.com', 'password':'password'}))
    }


    return (
        <div>
            <div className='splash-container'>
                <div className='splash-login__buton'>
                    
                </div>
                <div className='splash-main'>
                    <div className='splash-title'>
                        <img src={require('../../assets/logo_splash.png')} alt={'FutureScape Logo'} />
                    </div>

                    <div className='splash-text'>
                        <p className='about'>
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
                            <button onClick={demoLogin}>Demo Sign-In</button>
                        </div>
                    </div>

                   
                </div>
            </div>
            <SplashFooter />
        </div>
        
    )
}

export default SplashPage
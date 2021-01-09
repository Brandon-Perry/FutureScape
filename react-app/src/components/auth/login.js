import React, {useState, useEffect} from 'react'
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as sessionActions from "../../store/session";


const LoginForm = () => {
    const [errors, setErrors] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const currentUser = useSelector((state) => state.session.user)

    const dispatch = useDispatch()

    
    const onLogin = async(e) => {
        e.preventDefault();

        return dispatch(
            sessionActions.login({email, password})
        )
    }
    
    useEffect(() => {}, [dispatch])
    
    const updateEmail = (e) => {
        setEmail(e.target.value)
    }
    
    const updatePassword = (e) => {
        setPassword(e.target.value)
    }
    
    if (currentUser) {
        return <Redirect to='/app' />
    }
    return (
        <div className='signup'>
            <div>
                <h2>Login</h2>
            </div>
            <form className='signup-form' onSubmit={onLogin}>
                <div>
                    {errors.map(error => (
                        <div>{error}</div>
                    ))}
                </div>
                
                <input 
                    value={email} 
                    onChange={updateEmail} 
                    placeholder='Email'
                />
                <input 
                    value={password} 
                    onChange={updatePassword} 
                    placeholder='Password'
                />
                <button type='submit'>Log in</button>
               
            </form>
        </div>
    )
}

export default LoginForm
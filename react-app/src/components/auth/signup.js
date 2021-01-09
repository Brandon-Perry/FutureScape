import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'

const SignUpForm = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [authenticated, setAuthenticated] = useState(false)

    if (authenticated) {
        return <Redirect to='/app' />
    }

    const onSignUp = async(e) => {
        e.preventDefault();
        if (password === repeatPassword) {
            const user = signUp(username, email, password)
            // if (!user.errors) {
            //     setAuthenticated(true)
            // }
        }
    }

    const signUp = async (username, email, password) => {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })
        
        let resJson = await response.json()
        if (response.ok) {
            setAuthenticated(true)
        } 
        return resJson
    }

    const updateUserName = (e) => {
        setUsername(e.target.value);
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    const updateRepeatPassword = (e) => {
        setRepeatPassword(e.target.value)
    }

    return (
        <div className='signup'>
            <form onSubmit={onSignUp} className='signup-form'>
                <input 
                    onChange={updateUserName} 
                    value={username} 
                    placeholder='Name'
                />
                <input 
                    onChange={updateEmail} 
                    value={email}
                    placeholder='Email'
                />
                <input 
                    onChange={updatePassword} 
                    value={password} 
                    placeholder='Password'
                />
                <input 
                    onChange={updateRepeatPassword} 
                    value={repeatPassword} 
                    placeholder='Repeat Password'
                />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm
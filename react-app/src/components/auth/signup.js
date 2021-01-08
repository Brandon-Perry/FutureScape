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
        <div>
            <form onSubmit={onSignUp}>
                <input onChange={updateUserName} value={username} />
                <input onChange={updateEmail} value={email} />
                <input onChange={updatePassword} value={password} />
                <input onChange={updateRepeatPassword} value={repeatPassword} />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm
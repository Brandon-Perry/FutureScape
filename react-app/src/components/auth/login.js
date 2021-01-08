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

    return (
        <div>
            <div>
                {currentUser ? <p>User logged in</p> : <p>No user logged in</p>}
            </div>
            <form onSubmit={onLogin}>
                <div>
                    {errors.map(error => (
                        <div>{error}</div>
                    ))}
                </div>
                <div>
                    <input value={email} onChange={updateEmail} />
                    <input value={password} onChange={updatePassword} />
                    <button type='submit'>Log in</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
import React from 'react'
import { useDispatch } from "react-redux"
import { Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from "../../store/session"

const LogoutButton = () => {
const dispatch = useDispatch()
const history = useHistory()

  const onLogout = async (e) => {
    dispatch(
      sessionActions.logout()
    )
    history.push('/')
  };

  return <button onClick={onLogout} className="submit-button">Logout</button> ;
};

export default LogoutButton;
import React from 'react'
import { useDispatch } from "react-redux"
import * as sessionActions from "../../store/session"

const LogoutButton = () => {
const dispatch = useDispatch()

  const onLogout = async (e) => {
    return dispatch(
      sessionActions.logout()
    )
  };

  return <button onClick={onLogout} className="submit-button">Logout</button> ;
};

export default LogoutButton;
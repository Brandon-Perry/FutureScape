import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'


import './App.css';

import LoginForm from './components/auth/login'
import SignUpForm from './components/auth/signup'
import LogoutButton from './components/auth/logout'

import {authenticate} from './store/session'






function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, []);

	if (!loaded) {
		return null;
	}
  return (
    <div className="App">
      <LoginForm />
      <SignUpForm />
      <LogoutButton />
    </div>
  );
}

export default App;

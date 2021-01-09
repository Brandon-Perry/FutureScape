//MODULES
import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux'

//CSS
import './reset.css'
import './App.css';

//COMPONENTS
import LoginForm from './components/auth/login'
import SignUpForm from './components/auth/signup'
import LogoutButton from './components/auth/logout'
import SplashPage from './components/splashpage/splashpage'

//STORE
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
    <SplashPage />
  );
}

export default App;

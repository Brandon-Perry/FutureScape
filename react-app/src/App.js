//MODULES
import React, {useEffect, useState} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux'

//CSS
import './reset.css'
import './App.css';

//COMPONENTS

import SplashPage from './components/splashpage/splashpage'
import NavBar from './components/NavBar'

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
	  <BrowserRouter>
	  	<Switch>
			<Route exact path='/'>
				<SplashPage />
			</Route>
			<Route exact path='/app'>
				<NavBar />
			</Route>
		</Switch>
	  </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Login from './src/components/login';
import Planet from './src/components/planet';

const RouterComponent = () => {
	return(
		<Router>
			
			<Scene key="root">
				<Scene key="Login" component={Login} title="Login" />
				<Scene key="main">
					<Scene key="Planet" component={Planet} title="Planet" />
				</Scene>
			</Scene>
		</Router>
	)
}

export default RouterComponent;
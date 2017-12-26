import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Login from './src/components/login';
import Planet from './src/components/planet';
import PlanetInfo from './src/components/PlanetInfo';


const RouterComponent = () => {
	return(
		<Router>
			
			<Scene key="root">
				<Scene key="Login" component={Login} title="Login" hideNavBar={true}/>
				<Scene key="main">
					<Scene key="Planet" component={Planet} title="Planet" hideNavBar={true} />
					<Scene key="PlanetInfo" component={PlanetInfo} title="Planet Details" />
				</Scene>
			</Scene>
		</Router>
	)
}

export default RouterComponent;
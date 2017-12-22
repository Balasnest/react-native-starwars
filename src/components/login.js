import React from 'react';
import { Text, View, Image, StyleSheet, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Input, Button} from '../common';
import {loginAPI} from '../services/loginAPI';



class Login extends React.Component {

	constructor(){
		super();
		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onUsernameChange = this.onUsernameChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);

		this.state={
			logging: false,
			username: '',
			password: '',
		}
	}


	onUsernameChange(text) {
		this.setState({
			username: text
		})
	}

	onPasswordChange(text) {
		this.setState({
			password: text
		})
	}

	onLoginSuccess(){
		this.setState({
			logging: true
		})
		const username = this.state.username;
		const password = this.state.password;
		let response = await loginAPI(username, password);

		//Actions.reset('Planet');
	}

	render(){
		const { container, btnStyle } = styles;
		return(
			<View style={container}> 
				<Text> Hello Login </Text>

				<Input
					label = "Username"
					placeholder="Username"
					onChangeText={this.onUsernameChange}
					value={this.state.username}
				/>

				<Input
					label = "Password"
					placeholder="Password"
					onChangeText={this.onPasswordChange}
					value={this.state.password}
					secureTextEntry={true}
				/>

				<Button onPress={this.onLoginSuccess} style={{backgroundColor: 'blue'}}> Sign up </Button>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
  	backgroundColor: 'red'
  }
});

export default Login;
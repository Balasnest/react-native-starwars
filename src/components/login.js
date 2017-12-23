import React from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, AsyncStorage, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Input, Button} from '../common';
import {loginAPI} from '../services/loginAPI';

var _ = require('lodash');

class Login extends React.Component {

	constructor(){
		super();
		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onUsernameChange = this.onUsernameChange.bind(this);
		this.onPasswordChange = this.onPasswordChange.bind(this);
		this.getAllCharacters = this.getAllCharacters.bind(this);

		this.state={
			logging: false,
			username: '',
			password: '',
			characters: []
		}
	}

	componentWillMount(){
		this.getAllCharacters();
	}

	async getAllCharacters(){
		
		try{
			let response = await loginAPI();
		} catch(err){
			console.log(err);
		}
		
		this.setState({
			characters: response.results
		})
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

		const verifyLoginData =  _.filter(this.state.characters, { name: username, birth_year: password})
		console.log(verifyLoginData)
		
		this.setState({
			logging: false
		})
		// Actions.reset('main');
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

				<Button onPress={this.onLoginSuccess} style={{backgroundColor: 'blue'}}> LOGIN </Button>
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
});

export default Login;
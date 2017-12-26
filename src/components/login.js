import React from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, Platform, ActivityIndicator, AsyncStorage, Alert } from 'react-native';
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
			characters: [],
			error: ''
		}
	}

	componentWillMount(){
		this.setState({logging: true})
		this.getAllCharacters();
	}

	async getAllCharacters(){
		
		try{
			let response = await loginAPI();
            this.setState({
				characters: response.results,
				logging: false
			});
		} catch(err){
			console.log(err);
		}

	}

	onUsernameChange(text) {
		this.setState({
			username: text,
			error: '',
		})
	}

	onPasswordChange(text) {
		this.setState({
			password: text,
			error: ''
		})
	}

	renderAcitvity = () => {
		return <ActivityIndicator style={[{margin: 16},styles.indicator]} size="large" color="#7f8c8d" animating={this.state.loading} />
	}

	async onLoginSuccess(){
		this.setState({
			logging: true
		})
		const username = this.state.username;
		const password = this.state.password;

		try {
		  await AsyncStorage.setItem('username', username);
		} catch (error) {
		  // Error saving data
		}

		// Verify login creds in characters list
		const verifyLoginData =  _.filter(this.state.characters, { name: username, birth_year: password})
		console.log("username: "+username + " password: "+password)
		console.log("success: "+verifyLoginData);
		
		if(verifyLoginData.length != 0){
			Actions.reset('main');
		}
		else{
			this.setState({ error: 'Invalid Username/Password' })
		}
		
		this.setState({ logging: false })
		
	}

	render(){
		const { container, btnStyle, center } = styles;
		return(
			<View style={container}>
				
				<Text style={{fontSize: 18, color: '#fff', fontWeight: '600'}}> Welcome to Star Wars </Text>

				<View style={center}>
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

					{ this.state.error ? (
						<Text style={{fontSize: 12, color: 'red'}}>{this.state.error}</Text>
					) : null }

					{ this.state.logging ? (this.renderAcitvity()) : null} 

					<Button onPress={this.onLoginSuccess}> LOGIN </Button>
				</View>
				<Text style={{fontSize: 13, color: '#fff'}}> 2017-BALA </Text>

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
    paddingTop: 40,
    paddingBottom: 20
  },
  center:{
  	flex: 2,
  	alignItems: 'center',
  	justifyContent: 'center'
  }
});

export default Login;
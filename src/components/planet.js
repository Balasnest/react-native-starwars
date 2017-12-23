import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Button} from '../common';


class Planet extends React.Component {

	constructor(){
		super();
		this.onLoginSuccess = this.onLoginSuccess.bind(this);
	}

	onLoginSuccess(){
		Actions.reset('Login');
	}

	render(){
		const { container } = styles;
		return(
			<View style={container}>
				<Text> Hello Planet Screen </Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1abc9c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle: {
  	backgroundColor: 'red'
  }
});

export default Planet;

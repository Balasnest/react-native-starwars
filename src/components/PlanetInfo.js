import React, {Component} from 'react';
import { View, Text } from 'react-native';


export default class PlanetInfo extends Component {
	render(){
		const {name, population, climate, gravity, diameter, terrain, surface_water, orbital_period, rotation_period} = this.props.data;
		return(
			<View style={styles.container}>
				<View style={styles.subContainer}>
					<View style = {styles.row}>
						<Text selectable style={[styles.text, styles.strong, styles.measurement]}>name</Text>
						<Text selectable >{name}</Text>
					</View>

					<View style = {styles.row}>
						<Text selectable style={[styles.text, styles.strong, styles.measurement]}>Population</Text>
						<Text selectable>{population}</Text>
					</View>

					<View style = {styles.row}>
						<Text selectable style={[styles.text, styles.strong, styles.measurement]}>Climate</Text>
						<Text selectable>{climate}</Text>
					</View>

					<View style = {styles.row}>
						<Text selectable style={[styles.text, styles.strong, styles.measurement]}>Gravity</Text>
						<Text selectable>{gravity}</Text>
					</View>

					<View style = {styles.row}>
						<Text selectable style={[styles.text, styles.strong, styles.measurement]}>Diameter</Text>
						<Text selectable>{diameter}</Text>
					</View>

					<View style = {styles.row}>
						<Text selectable style={[styles.text, styles.strong, styles.measurement]}>Orbital period</Text>
						<Text selectable>{orbital_period}</Text>
					</View>

					<View style = {styles.row}>
						<Text selectable style={[styles.text, styles.strong, styles.measurement]}>Rotation period</Text>
						<Text selectable>{rotation_period}</Text>
					</View>

					<View style = {styles.row}>
						<Text selectable style={[styles.text, styles.strong, styles.measurement]}>Surface water</Text>
						<Text selectable>{surface_water}</Text>
					</View>

					<View style = {styles.row}>
						<Text selectable style={[styles.text, styles.strong, styles.measurement]}>Terrain</Text>
						<Text selectable>{terrain}</Text>
					</View>
				</View>
			</View>
		);
	}
}

/*
	Object {
      "climate": "temperate",
      "created": "2014-12-10T11:35:48.479000Z",
      "diameter": "12500",
      "edited": "2014-12-20T20:58:18.420000Z",
      "films": Array [
        "https://swapi.co/api/films/6/",
        "https://swapi.co/api/films/1/",
      ],
      "gravity": "1 standard",
      "name": "Alderaan",
      "orbital_period": "364",
      "population": "2000000000",
      "residents": Array [
        "https://swapi.co/api/people/5/",
        "https://swapi.co/api/people/68/",
        "https://swapi.co/api/people/81/",
      ],
      "rotation_period": "24",
      "surface_water": "40",
      "terrain": "grasslands, mountains",
      "url": "https://swapi.co/api/planets/2/",
    }
*/

const styles = {
	container:{
		backgroundColor: '#7f8c8d',
		flex: 1,
		padding: 15,
		alignItems: 'center',
		justifyContent: 'center'
	},
	subContainer:{
		padding: 20,
		margin: 0,
		borderRadius: 6,
		borderColor: 'transparent',
		backgroundColor: '#f1c40f',
		borderWidth: 2
	},
	row:{
		flexDirection: 'row',
		marginVertical: 4,
	},
	measurement: {
    	width: 120,
  	},
  	text: {
  		color: '#fff',
  		fontSize: 13,
  	},
  	strong:{
  		fontWeight: '600'
  	}
}
import React from 'react';
import { View, Text, Animated, Keyboard, TextInput, 
	TouchableOpacity, FlatList, Platform, AsyncStorage, 
	ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {Button} from '../common';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {planetsAPI} from '../services/planetsAPI';


class Planet extends React.Component {

	constructor(){
		super();
		this.onLoginSuccess = this.onLoginSuccess.bind(this);
		this.onChangeSearchText = this.onChangeSearchText.bind(this);
		this.searchPlanets = this.searchPlanets.bind(this);
		this.renderItem = this.renderItem.bind(this);
		this.numberOfRequest = this.numberOfRequest.bind(this);

		this.state = {
			search_name: '',
			planets: null,
			startTime : '',
			endTime : new Date() ,
			count: 0,
			seconds: 0,
			loading: false
		}
	}

	componentDidMount() {
	    setInterval( () => {
	      this.setState({
	        endTime : new Date()
	      })
	    },1000)
	}

	differenceInSeconds = () => {
	  var startInSec = this.state.startTime/1000;
	  var endInSec = this.state.endTime/1000;
	  return endInSec - startInSec
	}

	onLogOut = () => {
		Actions.reset('Login');
	}

	onChangeSearchText(text){
		this.setState({
			search_name: text
		});
		// Default Time
		if(this.state.startTime == 0){
			this.setState({
				startTime: this.state.endTime,
			})
		}
		try {
		  	this.numberOfRequest(text);
		} catch (error) {
		}
	}

	async numberOfRequest(text) {
		const value = await AsyncStorage.getItem('username');
		  
		  if (value == "Luke Skywalker"){
		    console.log(this.state.endTime);
		    this.searchPlanets(text);
		  }
		  
		  else{
		  	let seconds = this.differenceInSeconds()
		  	
		  	// More than a minute
		  	if(seconds > 60){
		  		this.searchPlanets(text);
		  		this.setState({
					startTime: this.state.endTime,
					count: 1,
					seconds: 0
				}, () => {
				  // console.log("sec: "+seconds + " count: "+this.state.count)
				});
		  	}

		  	// In a mintue
		  	else if(seconds < 60 && this.state.count < 15){
		  		this.searchPlanets(text);
		  		this.setState({
		  			count: this.state.count + 1,
		  			seconds: 0
		  		})
		  		// console.log("sec: "+seconds+ " count: "+this.state.count)
		  	}
		  	
		  	// Search count exceeded
		  	else{
		  		this.setState({
		  			planets: [],
		  		})
		  		// console.log("Rate limit: " + seconds);
				var secondsLeft = 60 - Math.trunc(seconds);
				Keyboard.dismiss(); 
				Alert.alert("You have tried 15 searches. Please try after "+secondsLeft+" seconds.");
				
		  	}
		  }
	}

	async searchPlanets(text){
		this.setState({loading: true})
		let response = await planetsAPI(text);
		this.setState({
			planets: response.results,
			loading: false
		})
	}

	onLoginSuccess(){
		Actions.reset('Login');
	}

	_handleClearPress = () => {
	    this.setState({
	    	search_name: '',
			planets: null
	    })
	  };

	responseError = () => {
		if(this.state.search_name && this.state.planets == 0){
			return(
				<View style={[{flex: 1, padding: 20}, styles.center]}>
					<Text style={{fontWeight: '600', fontSize: 28, color: '#fff'}}>OHHH!!! NO PLANETS IN THE STAR WARS UNIVERSE</Text>
				</View>
			)
		}
	}
	

	// Row Flat List
	 renderSeparator = () => {
	    return (
	      <View
	        style={{
	          height: 1,
	          width: "100%",
	          backgroundColor: "#CED0CE",
	          marginLeft: "0%"
	        }}
	      />
	    );
    };

	renderItem({item}) {
		//sized relative to their population 
		let size = 14
		if(item.population.toString().length > 8)
			size = size + 14
		else if(item.population.toString().length > 7)
			size = size + 8
		else if(item.population.toString().length > 6)
			size = size + 4
		else if(item.population.toString().length > 5)
			size = size + 1

		return(
			<TouchableOpacity activeOpacity={0.9} onPress={() => this.onPlanetInfo(item)}>
				<View style={{backgroundColor: 'white', 
					justifyContent: 'center', paddingHorizontal: 25, height: 40}}>
					<Text style={{fontSize: size}}>{item.name}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	renderAcitvity = () => {
		return <ActivityIndicator style={[{margin: 16},styles.indicator]} size="small" color="#7f8c8d" animating={this.state.loading} />
	}

	onPlanetInfo(item) {
		Actions.PlanetInfo({data: item});
	}

	render(){
		
		const {container,inputBox, header, navBar} = styles;
		return(
			<View style={container}>
	
				<View style={navBar}>
					
					<TextInput style={inputBox}
			          placeholder="Find Planets by name"
			          autoCorrect={false}
			          value={this.state.search_name}
			          onChangeText={this.onChangeSearchText}
			          underlineColorAndroid ='transparent'
			          returnKeyType="done"
			        />

			        <Icon
			          style={[styles.icon, styles.search]}
			          name="search"
			          size={Platform.OS === 'ios' ? 16 : 24}
			        />

			        {this.state.loading ? (
			        	 this.renderAcitvity()
			        ):null}


			        {this.state.search_name ? (

			        	<TouchableOpacity
			        	   onPress={this._handleClearPress}
			        	   style={styles.touchable}
			        	>
				        	<Icon
				                style={styles.icon}
				                name="cancel"
				                size={Platform.OS === 'ios' ? 16 : 24}
				            />
			            </TouchableOpacity>
			        ) : null}
				</View>

				{this.responseError()}
				
				{this.state.search_name ? (
					<FlatList 
						data={this.state.planets}
				        keyExtractor={(item, index) => item.name}
				        renderItem={this.renderItem}
				        ItemSeparatorComponent={this.renderSeparator}
					/>
				) : 
					<View style={[{margin: 16}, styles.center]}>
						<Text style={{fontWeight: '600', fontSize: 28, color: '#fff'}}>SEARCH PLANETS IN THE STAR WARS UNIVERSE</Text>
					</View>
				 }

				 

				<TouchableOpacity activeOpacity={0.8} onPress={this.onLogOut} style={styles.logOut}>
			      <Text style={{fontWeight: '600', color: '#34495e'}}>
			        LOGOUT
			      </Text>
			    </TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1abc9c',
    paddingTop: Platform.OS === 'ios' ? 20 : Expo.Constants.statusBarHeight
  },
  header:{
  	height:60,
  	flexDirection: 'row',
  	backgroundColor: '#fff',
  	padding: 20
  },
  navBar:{
  	backgroundColor: '#fff',
  	height: 55,
  	shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: StyleSheet.hairlineWidth,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
    },
    borderColor: 'rgba(0, 0, 0, 0.16)',
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'rgba(0, 0, 0, .32)',
    margin: 14,
  },
  search: {
    position: 'absolute',
    top: 0,
    left: 0,
    ...Platform.select({
      ios: {
      	top: 5
      }
    })
  },
  indicator:{
  	position: 'absolute',
    top: 0,
    right: 35,
  },
  touchable: {
    position: 'absolute',
    top: 0,
    right: 0,
    ...Platform.select({
      ios: {
      	top: 5
      }
    })
  },
  inputBox:{
  	color: '#000',
    flex: 1,
    margin: 0,
    paddingVertical: 0,
    paddingRight: 8,
  	...Platform.select({
      ios: {
        paddingLeft: 28,
        paddingRight: 60,
        borderRadius: 5,
        backgroundColor: '#f0f0f0',
        margin: 8,
        height: 28,
      },
      default: {
        paddingLeft: 48,
        paddingRight: 80,
        height: 48,
      },
    }),
  },
  logOut:{
  	position: 'absolute',
  	bottom: 5,
  	right: 5,
  	width: 100,
  	borderRadius: 2,
  	backgroundColor: '#ddd',
  	padding: 5,
  	alignItems: 'center',
    justifyContent: 'center',
  },
  center:{
  	alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    height: Platform.OS === 'ios' ? 44 : 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
});

export default Planet;

import axios from 'react-native-axios'; 

export async function planetsAPI(name) {
  // simulate an asynchronous operation
    const url = "https://swapi.co/api/planets/?search="+name;
    
	return new Promise(function (resolve, reject) {
		axios.get(url)
	  	.then((response) => {
	  		console.log("====== Planets API Response =====");
	  		console.log(response.data);
	  		if(response.status === 200)
	  			resolve(response.data);

	  	})
		.catch((error) => {
	  		console.log("axios error:",error);
	  		reject(null)
		});
	});   
} 
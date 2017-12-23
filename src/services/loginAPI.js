import axios from 'react-native-axios'; 

export async function loginAPI() {
  // simulate an asynchronous operation
    const url = "https://swapi.co/api/people";
    
	return new Promise(function (resolve, reject) {
		axios.get(url)
	  	.then((response) => {
	  		console.log("====== Login API Response =====");
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
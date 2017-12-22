import axios from 'react-native-axios'; 

export async function loginAPI(username, password) {
  // simulate an asynchronous operation
    const url = "https://swapi.co/api/people/?search="+username;
    
	return new Promise(function (resolve, reject) {
		axios.get(url)
	  	.then((response) => {
	  		console.log("====== Login API Response =====");
	  		console.log(response);
	  		if(response.status === 200)
	  			resolve(response.data.result);

	  	})
		.catch((error) => {
	  		console.log("axios error:",error);
	  		reject(null)
		});
	});   
} 
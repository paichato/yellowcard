import axios from "axios";

const api_key=String(process.env.API_SPORTS);

const http = axios.create({
 
    baseURL:"https://api-football-v1.p.rapidapi.com/v3/",
    headers:{
       
        'x-rapidapi-key':api_key,
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        
    }
  });
  
  export default http;
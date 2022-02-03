import axios from "axios";

const api_key=String(process.env.API_SPORTS);

const http = axios.create({
    baseURL: "https://v3.football.api-sports.io/",
    headers:{
        'x-apisports-key':api_key,
        'x-rapidapi-host':'v3.football.api-sports.io'
    }
  });
  
  export default http;
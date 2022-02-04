import axios from "axios";

const api_key=String(process.env.API_SPORTS);

const http = axios.create({
    // baseURL: "https://v3.football.api-sports.io/",
    baseURL:"https://api-football-v1.p.rapidapi.com/v3/",
    headers:{
        // 'x-apisports-key':api_key,
        // 'x-apisports-key':'8d0fb5fa0011dbac42c4cd461e63f7a9',
        'x-rapidapi-key':'b7949d3004mshe17ec4fdf016d0cp1c4473jsna630e9708a4d',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
        // 'x-rapidapi-host':'v3.football.api-sports.io'
    }
  });
  
  export default http;
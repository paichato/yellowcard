import axios from "axios";

const api = axios.create({
    baseURL: "https://v3.football.api-sports.io/",
    headers:{
        'x-apisports-key':String(process.env.API_SPORTS),
        'x-rapidapi-host':'v3.football.api-sports.io'
    }
  });
  
  export default api;
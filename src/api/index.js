import axios from 'axios';

const config = axios.create({
    baseURL: 'http://localhost:8080',
    responseType: 'json'
});

export default config;
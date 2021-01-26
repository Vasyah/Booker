import axios from 'axios';

const config = axios.create({
    baseURL: 'http://localhost:8080'
});

export default config;
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://ls99nr0r-5146.brs.devtunnels.ms/api/', 
});

export default api;
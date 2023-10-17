import axios from 'axios';

const url = 'http://localhost:4000/api/';

export const publicRequest = axios.create({
    baseURL: url
});
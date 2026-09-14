import axios from 'axios';

export const apiClient=axios.create({
     baseURL:'https://api.jsonbin.io/v3/b/6aa7ad32ac6210605aca8a53',
     timeout:10000,
    headers:{
        'Content-Type': 'application/json',
    }
})
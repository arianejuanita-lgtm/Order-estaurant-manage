import axios from 'axios';

export const apiClient=axios.create({
     baseURL:'https://api.jsonbin.io/v3/b/6ab0f385ffd5d160531ec18e',
     timeout:10000,
    headers:{
        'Content-Type': 'application/json',
    }
})
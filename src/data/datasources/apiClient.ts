import axios from 'axios';

export const apiClient=axios.create({
     baseURL:'https://api.jsonbin.io/v3/b/6aaa9e3dac6210605ad4bcfb',
     timeout:10000,
    headers:{
        'Content-Type': 'application/json',
    }
})
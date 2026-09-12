import axios from 'axios';

export const apiClient=axios.create({
     baseURL:'https://api.jsonbin.io/v3/b/6aa5d02cffd5d16053ffa0e9',
     timeout:10000,
    headers:{
        'Content-Type': 'application/json',
    }
})
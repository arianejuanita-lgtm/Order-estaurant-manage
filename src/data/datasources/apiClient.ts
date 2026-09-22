import axios from 'axios';

export const apiClient=axios.create({
     baseURL:'https://api.jsonbin.io/v3/b/6ab23c60ffd5d160532239c1',
     timeout:10000,
    headers:{
        'Content-Type': 'application/json',
    }
})
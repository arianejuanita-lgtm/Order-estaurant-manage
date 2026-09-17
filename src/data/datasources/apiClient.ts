import axios from 'axios';

export const apiClient=axios.create({
     baseURL:'https://api.jsonbin.io/v3/b/6aaac71effd5d160530ee10f',
     timeout:10000,
    headers:{
        'Content-Type': 'application/json',
    }
})
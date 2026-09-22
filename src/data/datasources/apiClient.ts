import axios from 'axios';

export const apiClient=axios.create({
     baseURL:'https://api.jsonbin.io/v3/b/6ab2545dffd5d160532289b0',
     timeout:10000,
    headers:{
        'Content-Type': 'application/json',
    }
})
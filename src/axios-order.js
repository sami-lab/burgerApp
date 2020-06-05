import axios from 'axios';

const instance = axios.create({
     baseURL : 'https://burger-maker-1b07b.firebaseio.com/'
});
export default instance;
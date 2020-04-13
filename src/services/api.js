import axios from 'axios';
// import AsyncStorage from '@react-native-community/async-storage';

const api = axios.create({
     baseURL: "https://us-central1-aprendizado-d09ee.cloudfunctions.net",
});

export default api;

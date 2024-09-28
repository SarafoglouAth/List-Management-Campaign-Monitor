import axios from 'axios';


const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 50000, 
  cancelToken: source.token
 
});

export default api;
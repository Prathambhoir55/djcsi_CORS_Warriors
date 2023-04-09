import axios from 'axios';

export default axios.create({
  baseURL: 'http://corswarriors.pythonanywhere.com',

  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  mode: 'cors',
});

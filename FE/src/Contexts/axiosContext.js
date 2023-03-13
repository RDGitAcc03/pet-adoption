const axios = require("axios");

function getServerUrl(){
  if (process.env.NODE_ENV === 'production') return 'https://example-petadoption.onrender.com'
  return "http://localhost:8080";
}

const instance = axios.create({
  baseURL: getServerUrl(),
  // timeout: 1000,
  withCredentials: true,
});

export default instance;

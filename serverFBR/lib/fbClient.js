const axios = require('axios');

const baseURL = process.env.FIREBASE_URL;

if (!baseURL) {
  console.warn('FIREBASE_URL is not set. Set process.env.FIREBASE_URL to use Firebase.');
}

const get = (path) => axios.get(`${baseURL}${path}`);
const post = (path, body) => axios.post(`${baseURL}${path}`, body);
const put = (path, body) => axios.put(`${baseURL}${path}`, body);
const del = (path) => axios.delete(`${baseURL}${path}`);

module.exports = { get, post, put, del };

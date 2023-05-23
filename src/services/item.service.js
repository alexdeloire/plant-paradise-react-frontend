import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'https://backend-plant-paradise.cluster-ig3.igpolytech.fr/api';
//const API_URL = 'http://localhost:8080/api';

class ItemDataService {
  getAll(params) {
    return axios.get(API_URL + "/items", { params, headers: authHeader() });
  }

  getAllUnpublished(params) {
    return axios.get(API_URL + "/items/unpublished", { params, headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `/items/${id}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL + "/items", data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL + `/items/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `/items/${id}`, { headers: authHeader() });
  }

  deleteAll() {
    return axios.delete(API_URL + `/items`, { headers: authHeader() });
  }

  findByTitle(title) {
    return axios.get(API_URL + `/items?title=${title}`, { headers: authHeader() });
  }
}

export default new ItemDataService();
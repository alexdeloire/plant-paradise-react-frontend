import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://backend-plant-paradise.cluster-ig3.igpolytech.fr/api/biotopes";
//const API_URL = 'http://localhost:8080/api/biotopes';

class BiotopeService {
  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getById(id) {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  create(biotope) {
    return axios.post(API_URL, biotope, { headers: authHeader() });
  }

  update(id, biotope) {
    return axios.put(`${API_URL}/${id}`, biotope, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }
}

export default new BiotopeService();

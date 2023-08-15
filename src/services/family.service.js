import axios from "axios";
import authHeader from './auth-header';

//const API_URL = "https://backend-plant-paradise.cluster-ig3.igpolytech.fr/api/families";
const API_URL = 'http://localhost:8080/api/families';

class FamilyService {
  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  getById(id) {
    return axios.get(`${API_URL}/${id}`, { headers: authHeader() });
  }

  create(family) {
    return axios.post(API_URL, family, { headers: authHeader() });
  }

  update(id, family) {
    return axios.put(`${API_URL}/${id}`, family, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  }
}

export default new FamilyService();

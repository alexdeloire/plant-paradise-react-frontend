import axios from 'axios';
import authHeader from './auth-header';

//const API_URL = 'http://backend-plant-paradise.cluster-ig3.igpolytech.fr/api/test/';
const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(API_URL + 'users', { headers: authHeader() });
  }

  updateRoles(username, roles) {
    return axios.put(API_URL + 'users/' + username, { roles }, { headers: authHeader() });
  }
}

export default new UserService();

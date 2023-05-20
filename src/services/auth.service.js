import axios from "axios";

//const API_URL = "http://backend-plant-paradise.cluster-ig3.igpolytech.fr/api/auth/";
const API_URL = "http://localhost:8080/api/auth/";


class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    })
    .then(response => {
      if (response.data.user.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response;
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();

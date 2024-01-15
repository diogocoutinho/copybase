import axios from "axios";
import {useAuthStore} from "@/stores/authStore";
import router from "@/router";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

apiClient.interceptors.request.use(config => {
  const token = useAuthStore().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (router.currentRoute.value.name !== 'login' && router.currentRoute.value.name !== 'register') {
    router.push({name: 'login'}).then(r => r)
  }
  return config;
}, error => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    router.push({name: 'login'}).then(r => r)
  }
  return Promise.reject(error);
});

export default apiClient;

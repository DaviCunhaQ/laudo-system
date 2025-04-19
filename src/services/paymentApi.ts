import axios from "axios";

export const paymentApi = axios.create({
  baseURL: import.meta.env.VITE_API_WHATSAPP_URL,
});

paymentApi.interceptors.request.use(
  (config) => {
    const token = import.meta.env.VITE_API_WHATSAPP_TOKEN;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
